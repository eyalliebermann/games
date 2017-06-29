const axios = require('axios');
const cheerio = require('cheerio');

const urls = ['http://www.livesport.co.uk/',
    'http://www.livesport.co.uk/category/football/',
    'http://www.livesport.co.uk/category/tennis/',
    'http://www.livesport.co.uk/category/basketball/'
];

module.exports.scrap = function () {
    console.log('\n\n\n livesport scrap scport\n\n\n')
    return scrapUrls(urls);

}



function scrapUrls(urls, callback) {
    return axios.all(urls.map(url => axios.get(url)))
        .then(axios.spread(function (...responses) {
            let arrays = responses.map(response => parseVideoStreams(response.data));
            let merged = [].concat.apply([], arrays);
            return merged;
        }))
        .then((arr) => {
            console.log(`Array length pre cleanup: ${arr.length}`);
            clean = cleanDup(arr);
            console.log(`Array length post cleanup is: ${clean.length}`);
            return clean
        });
      //  .then(dedupped=>dedupped.map(game=>{});
}

function parseVideoStreams(html) {
    function parseDate(text) {
        return new Date(Date.parse(`${text} GMT`));
    }

    function parseCompetitors(text) {
        return text;
        //return text.split(/\svs\s|\sv\s|\s@\s/).map(team => team.split(/\s\/\s/));
    }

    let $ = cheerio.load(html);
    let videostreams = [];
    $('li', '.cal-list').each((i, elm) => {
        videostreams.push({
            date: parseDate($(elm).children().first().attr('data-streamdate')),
            sport: $(elm).children().eq(1).first().text(),
            league: $(elm).children().eq(2).children().eq(1).text(),
            competitors: parseCompetitors($(elm).children().eq(2).children().first().text()),
            sourceHtml: $(elm).html()
        });
    });
    return (videostreams);
}

function cleanDup(arr) {
    function compareGames(g1, g2) {
        function compare(str1, str2) {
            return str1 > str2 ? 1 : (str1 < str2 ? -1 : 0);
        }

        return compare(g1.sport, g2.sport) ||
            compare(g1.league, g2.league) ||
            compare(g1.competitors, g2.competitors) ||
            compare(g1.date, g2.date);
    }

    function compareGamesTimeless(g1, g2) {
        function compare(str1, str2) {
            return str1 > str2 ? 1 : (str1 < str2 ? -1 : 0);
        }

        return compare(g1.sport, g2.sport) ||
            compare(g1.league, g2.league) ||
            compare(g1.competitors, g2.competitors);
    }

    return arr.sort(compareGames).reduce( (acc, cur) => {
        if (!acc.length)
            acc.push(cur);
        else {
            last = acc[acc.length - 1];
            if (compareGamesTimeless(last, cur)) {
                acc.push(cur);
            } else if (Math.abs(new Date(last.date) - new Date(cur.date)) > 1000 * 60 * 60 * 2) {
                acc.push(cur);
            } else {
                console.log(`\nIdentical games or times too close:\n ${JSON.stringify(last,null,4)} \n ${JSON.stringify(cur,null,4)}`);
            }
        }
        return acc;
    },[]);
}