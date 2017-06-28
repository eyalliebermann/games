const axios = require('axios');
const cheerio = require('cheerio');

const urls = ['http://www.livesport.co.uk/',
    'http://www.livesport.co.uk/category/football/',
    'http://www.livesport.co.uk/category/tennis/',
    'http://www.livesport.co.uk/category/basketball/'
];

module.exports.scrap = function (callback) {
    console.log('\n\n\n livesport scrap scport\n\n\n')
    return scrapUrls(urls, callback);
}



function scrapUrls(urls, callback) {
    axios.all(urls.map(url => axios.get(url)))
        .then(axios.spread(function (...responses) {
            let arrays = responses.map(response => parseVideoStreams(response.data));
            let merged = [].concat.apply([], arrays);
            return merged;
        }))
        .then((arr) => {
            console.log(JSON.stringify(arr, null, 4));
            return (arr);
        }).then(function (json) {
            callback(json);
        });
}

function parseVideoStreams(html) {
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


function parseDate(text) {
    return text;
   // return new Date(Date.parse(`${text} GMT`));
}

function parseCompetitors(text) {
    return text;
    //return text.split(/\svs\s|\sv\s|\s@\s/).map(team => team.split(/\s\/\s/));
}