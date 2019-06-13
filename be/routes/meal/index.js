const express = require('express');
const Menu = require('../../models/menu');
const School = require('node-school-kr');

const router = express.Router();
const school = new School();

var today_menu = {};

school.init(School.Type.HIGH, School.Region.GWANGJU, 'F100000120');

router.get('/', async function(req, res, next) {
    var date = new Date().toLocaleDateString().split("-");
    var [year, month, day] = date;

    if (today_menu.hasOwnProperty(day)) {
        result = today_menu[day];
    }
    else {
        result = await parseMeal();
        await addToDB(result);

        if (today_menu.length > 0) {
            console.log('Deleted 1 item from "today_menu".');
            delete today_menu[Object.keys(today_menu)[0]];
        }

        today_menu[day] = result;
    }

    res.send({
        'date': {
            'year': year,
            'month': month,
            'day': day
        },
        'data': result
    });
});

const parseMeal = async function() {
    const meal = await school.getMeal();

    var re = /[가-힣\s]+/;
    var thisMeal = {
        'breakfast': [],
        'lunch': [],
        'dinner': []
    };

    var index = null;
    var today = meal.today.split("\n");
    today.forEach(element => {
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
            Menu.find({'name': element})
            .then(r => {
                if (r.length === 0) {
                    Menu.create({'name': element})
                    .then(r => console.log(`${element} was added to MongoDB.`))
                }
            });
        });
    });
}

module.exports = router;