"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brew_logic_1 = require("../logic/brew-logic");
const profile_logic_1 = require("../logic/profile-logic");
const mock_brew_data_1 = require("./mock-brew-data");
const mock_profile_data_1 = require("./mock-profile-data");
describe('brew keeper server', () => {
    let testSessionProfileID;
    describe('brew logic', () => {
        let brewLogic;
        beforeEach(() => {
            brewLogic = new brew_logic_1.BrewLogic(new mock_brew_data_1.MockBrewData());
            testSessionProfileID = 'testProfileID';
        });
        it('can be instantiated', () => {
            expect(brewLogic).toBeTruthy();
        });
        it('retrieves a brew by ID', done => {
            brewLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });
        it('saves a new brew, returning it with a populated ID', done => {
            let testBrew = { name: 'New Brew', ownerProfileID: '123' };
            brewLogic.create(testSessionProfileID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });
        it('fails to save a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: '123' };
            brewLogic.create(testSessionProfileID, testBrew).then(response => {
                expect(response.success).toBe(false);
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
    describe('profile logic', () => {
        let profileLogic;
        beforeEach(() => {
            profileLogic = new profile_logic_1.ProfileLogic(new mock_profile_data_1.MockProfileData());
            testSessionProfileID = 'testProfileID';
        });
        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });
    });
});
//# sourceMappingURL=app.spec.js.map