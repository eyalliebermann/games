import liveport  from '../server/liveport';


describe('scrapping', function () {
    it('scraps root', function (done) {

        let json = liveport.scrap();
        json[1].sport.should.equal('Tennis');
    });
});