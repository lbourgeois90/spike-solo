const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
var moment = require('moment');
var cron = require('node-cron');
var CronJob = require('cron').CronJob;
var http = require('http');


currentTime= moment().format('HH:mm')
currentDate= moment().format('YYYY-MM-DD')
console.log(currentTime);
console.log(currentDate);



// function getActivatorData() {
//     console.log('in getActivatorData')
//       router.get('/activators', (req, res) => {
//         pool.query(`SELECT * FROM "questions"`)
//         .then((result) => {
//             console.log(result.rows);
//         res.send(result.rows);

//       })
//     })
// }
    //   setTimeout(getActivatorData, 1000);


router.get('/activators/start', (req, res) => {

    console.log('in SERVER GET ACTIVATOR START');
    pool.query(`SELECT * FROM "questions"`)
    .then((result) => {
        console.log(result.rows);
        console.log('Current time is', moment().format('HH:mm') );
        console.log('Current date is', moment().format('YYYY-MM-DD')); 
        for(var i = 0; i < result.rows.length; i++) {
            if (result.rows[i].time_start == moment().format('HH:mm') && result.rows[i].date == moment().format('YYYY-MM-DD') ) {
                console.log('It is true');
                res.send(result.rows[i]);
            } 
         }
    })
    .catch((error) =>{
        console.log(`ERROR IN GET ACTIVATOR START`, error);
        res.sendStatus(500);
    })
})


router.get('/activators/end', (req, res) => {

    console.log('in SERVER GET ACTIVATOR END');
    pool.query(`SELECT * FROM "questions"`)
    .then((result) => {
        console.log(result.rows);
        console.log('Current time is', moment().format('HH:mm') );
        console.log('Current date is', moment().format('YYYY-MM-DD')); 
        for(var i = 0; i < result.rows.length; i++) {
            if (result.rows[i].time_end == moment().format('HH:mm') && result.rows[i].date == moment().format('YYYY-MM-DD') ) {
                console.log('It has ended');
                res.send('Question has ended');
            }  
         }
    })
    .catch((error) =>{
        console.log(`ERROR IN GET ACTIVATOR`, error);
        res.sendStatus(500);
    })
})




router.get('/classes', (req, res) => {
    console.log('in SERVER GET CLASSES');
    pool.query(`SELECT "class_period", "id" FROM "classes" ORDER BY "class_period" ASC`)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`ERROR IN GET CLASSES`, error);
        res.sendStatus(500);
    })
})

router.post('/answer', (req, res) => {
    const newAnswer = req.body;
    console.log(newAnswer);
    const sqlText = `INSERT INTO "student_answers" ("answer", "question_id") VALUES ($1, $2);`;

    pool.query(sqlText, 
        [ newAnswer.answer, newAnswer.question_id]
    )
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POSTING ANSWER`, error);
            res.sendStatus(500);
        });
});





router.post('/', (req, res) => {
    const newActivator = req.body;
    console.log(newActivator);
    const sqlText = `INSERT INTO "questions" ("date", "time_start", "time_end", "question_type", "question") VALUES ($1, $2, $3, $4, $5);`;

    pool.query(sqlText, 
        [ newActivator.date, newActivator.time_start, newActivator.time_end, newActivator.question_type, newActivator.question]
    )
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POSTING ACTIVATOR`, error);
            res.sendStatus(500);
        });
});



module.exports = router;