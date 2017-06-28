const express = require('express');
const app = express();
const livesport = require('./server/livesport');

app.use('/', express.static('dist'))


app.get('/api/v1.0/games/', function (req, res) {
    livesport.scrap(function (result) {
            res.send(result);
        });
    });

app.listen(3000, function () {
    console.log('App listening on port 3000!')
});