const express = require('express');
const app = express();
const livesport = require('./server/livesport');


(function () {
    //bootstrapping
    _initialized = false;
    _games = {
        updated: Date.now,
        games: [{
            sport: 'Fake',
            league: 'fake',
            competitors: 'fake',
            date: Date.now
        }]
    };

    app.use('/', express.static('dist'))

    app.set('port', (process.env.PORT || 3333));

    app.get('/api/v1.0/games/', function (req, res) {
        res.json(_games);
    });

    setInterval(() => {
        if (!_initialized) {
            startListen();
            _initialized = true;
        }

        livesport.scrap().then(games => _games = {
            updated: Date.now,
            games: games
        })
    }, 5000);

    function startListen() {
        app.listen(app.get('port'), function () {
            console.log(`App listening on port ${app.get('port')}!!!`)
        });
    }
})()