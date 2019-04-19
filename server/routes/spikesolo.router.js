const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
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