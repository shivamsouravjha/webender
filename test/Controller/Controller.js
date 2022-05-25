// Requiring module
const assert = require('assert');
const Contoller = require('../../app/Controllers/Controller');

// We can group similar tests inside a describe block
describe("Controller Class", () => {
    before(() => {
        console.log("This part executes once before all tests");

    });

    after(() => {
        console.log("This part executes once after all tests");
    });

    // We can add nested blocks for different tests
    describe("ReportControllerExistance", () => {
        beforeEach(() => {
        });
        //Check class existance
        let newOnject = new Contoller({ key: 'MyRes' });

        it("Check class existance", () => {
            assert.equal(newOnject.response.key, 'MyRes');
        });

    });

});
