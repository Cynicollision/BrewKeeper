"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brew_logic_1 = require("../logic/brew-logic");
const profile_logic_1 = require("../logic/profile-logic");
const mock_brew_data_1 = require("./mock-brew-data");
const mock_profile_data_1 = require("./mock-profile-data");
describe('brew keeper server', () => {
    let mockBrewData;
    let mockProfileData;
    let brewLogic;
    let testExternalID;
    let testProfileID;
    beforeEach(() => {
        mockBrewData = new mock_brew_data_1.MockBrewData();
        mockProfileData = new mock_profile_data_1.MockProfileData();
        testExternalID = mockProfileData.testExternalID;
        testProfileID = mockProfileData.testProfileID;
    });
    describe('brew logic', () => {
        beforeEach(() => {
            brewLogic = new brew_logic_1.BrewLogic(mockBrewData, mockProfileData);
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
        it('creates a new brew, returning it with a populated ID', done => {
            let testBrew = { name: 'New Brew', ownerProfileID: testProfileID };
            brewLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });
        it('fails to create a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: testProfileID };
            brewLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new brew if Owner Profile ID is not provided', done => {
            let testBrew = { name: 'New Brew' };
            brewLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new brew if the ExternalID is not valid for the claimed Owner Profile ID', done => {
            let testBrew = { name: 'New Brew' };
            brewLogic.create('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('updates a brew, returning the updated version', done => {
            let testBrew = { id: '999', name: 'Updated Brew', ownerProfileID: testProfileID };
            brewLogic.update(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Brew');
                expect(response.data.id).toBe('999');
                done();
            });
        });
        it('fails to update a brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: testProfileID };
            brewLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a brew if Owner Profile ID is not provided', done => {
            let testBrew = { name: 'Updated Brew' };
            brewLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a brew if the External ID is not valid for the claimed Owner Profile ID', done => {
            let testBrew = { name: 'Updated Brew' };
            brewLogic.update('somethingelse', testBrew).then(response => {
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
            profileLogic = new profile_logic_1.ProfileLogic(mockBrewData, mockProfileData);
            testExternalID = mockProfileData.testExternalID;
            testProfileID = mockProfileData.testProfileID;
        });
        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });
        it('retrieves profile data by ID', done => {
            mockBrewData.setCollection([
                { id: '111', name: 'Test Brew 1', ownerProfileID: testProfileID },
                { id: '222', name: 'Test Brew 2', ownerProfileID: testProfileID },
                { id: '333', name: 'Test Brew 3', ownerProfileID: testProfileID },
            ]);
            profileLogic.getProfileData(testExternalID, testProfileID).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.brews.length).toBe(3);
                done();
            });
        });
    });
});
//# sourceMappingURL=app.spec.js.map