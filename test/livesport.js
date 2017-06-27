var expect = require("chai").expect
var should = require("chai").should()
var scrap = require("../server/livesport").scrap

describe("Scrapping livesports", function () {
    it('base returns Tennis', function () {
        scrap().games[1].sport.should.be.equal('Tennis');
    })
})