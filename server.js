const express = require('express');
const app = express();
const livesport = require('./server/livesport');

app.use('/', express.static('dist'))

app.set('port', (process.env.PORT || 3333));

app.get('/api/v1.0/games/', function (req, res) {
    livesport.scrap()
        .then(function (json) {
            res.send(json);
        });
});

app.listen(app.get('port'), function () {
    console.log('App listening on port 3000!')
});