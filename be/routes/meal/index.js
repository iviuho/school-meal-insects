const express = require('express');
const Menu = require('../../models/menu');
const School = require('node-school-kr');

const router = express.Router();
const school = new School();

school.init(School.Type.HIGH, School.Region.GWANGJU, 'F100000120');

router.get('/', async function(req, res, next) {
    result = await parseMeal();
    await addToDB(result);
    res.send({
        data: result
    });
});

const parseMeal = async function() {
    const meal = await school.getMeal();

    var re = /[가-힣\s]+/;
    var thisMeal = {
        breakfast: [],
        lunch: [],
        dinner: []
    };

    var index = null;
    meal.today.split("\n").forEach(element => {
        switch (element) {
            case "[조식]":
                index = "breakfast";
                break;
            case "[중식]":
                index = "lunch";
                break;
            case "[석식]":
                index = "dinner";
                break;
            default:
                thisMeal[index].push(re.exec(element).pop());
        }
    });

    return thisMeal;
}

const addToDB = async function(data) {
    keys = Object.keys(data);

    keys.forEach(key => {
        data[key].forEach(element => {
            Menu.find({name: element})
            .then(r => {
                if (r.length === 0) {
                    Menu.create({name: element})
                    .then(r => console.log(`${element} was added to MongoDB.`))
                }
            });
        });
    });
}

module.exports = router;