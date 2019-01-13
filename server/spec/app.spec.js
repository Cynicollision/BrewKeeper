"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brew_logic_1 = require("../logic/brew-logic");
const mock_brew_data_1 = require("./mock-brew-data");
describe('brew keeper server', () => {
    describe('brew logic', () => {
        let brewLogic;
        beforeEach(() => {
            brewLogic = new brew_logic_1.BrewLogic(new mock_brew_data_1.MockBrewData());
        });
        it('retrieves a brew by ID', done => {
            brewLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });
        it('fails to retrieve a brew when no ID is specified', done => {
            brewLogic.get('').then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
    });
});
//# sourceMappingURL=app.spec.js.map