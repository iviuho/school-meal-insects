const express = require('express');
const Menu = require('../../models/menu').menuSchema;
const School = require('node-school-kr');

const router = express.Router();
const school = new School();

var today_menu = {};

school.init(School.Type.HIGH, School.Region.GWANGJU, 'F100000120');

router.get('/', async function(req, res, next) {
    var date = new Date().toLocaleDateString().split("-");
    var [year, month, day] = date;

    // 이미 오늘 급식 조회를 한 이후라서 데이터를 보관중 일 때
    if (today_menu.hasOwnProperty(day)) {
        result = today_menu[day];
    }
    // 오늘 급식이 보관되어 있지 않을 때
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
    var date = new Date().toLocaleDateString();

    for (var key in data) {
        data[key].forEach(element => {
            Menu.find({'name': element})
            .then(r => {
                if (r.length === 0) {
                    Menu.create({'name': element, 'frequency': [date]})
                    .then(result => console.log(`${element} was added to MongoDB.`))
                    .catch(error => {});
                }
                else {
                    if (r[0]['frequency'].find(e => {return (e === date)}) === undefined) {
                        Menu.updateOne({'name': element}, {'$push': {"frequency": date}})
                        .then(result => console.log(`${element} was updated today's date.`))
                        .catch(error => {});
                    }
                }
            })
            .catch(e => console.error(e));
        })
    }
}

module.exports = router;