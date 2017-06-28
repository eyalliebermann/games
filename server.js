const express = require('express');
const app = express();
const livesport = require('./server/livesport');


app.get('/', function (req, res) {
    livesport.scrap(function (result) {
            console.log('\n\n\nEXPRESS LISTENER\n\n\n')
            res.send(result);
        });
    });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});