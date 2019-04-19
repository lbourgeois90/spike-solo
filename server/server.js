const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const spikesolo = require('./routes/spikesolo.router.js')


app.use(bodyParser.json()); 
app.use(express.static('build'));

app.use('/spikesolo', spikesolo);



app.listen(port, function () {
    console.log('Listening on port: ', port);
});

