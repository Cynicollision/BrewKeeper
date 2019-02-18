"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_logic_1 = require("../logic/profile-logic");
const mock_profile_data_1 = require("./mock-profile-data");
const mock_logic_1 = require("./mock-logic");
const mock_data_1 = require("./mock-data");
describe('brew keeper server', () => {
    let mockProfileData;
    let testExternalID;
    let testProfileID;
    beforeEach(() => {
        mockProfileData = new mock_profile_data_1.MockProfileData();
        testExternalID = mockProfileData.testExternalID;
        testProfileID = mockProfileData.testProfileID;
    });
    describe('resource logic', () => {
        let mockResourceData;
        let resourceLogic;
        beforeEach(() => {
            mockResourceData = new mock_data_1.MockDataController();
            resourceLogic = new mock_logic_1.MockResourceLogic(mockResourceData, mockProfileData);
        });
        it('can be instantiated', () => {
            expect(resourceLogic).toBeTruthy();
        });
        it('retrieves a resource by ID', done => {
            resourceLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });
        it('creates a new resource, returning it with a populated ID', done => {
            let testResource = { name: 'New Resource', ownerProfileID: testProfileID };
            resourceLogic.create(testExternalID, testResource).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Resource');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });
        it('fails to create a new resource if Name is not provided', done => {
            let testResource = { ownerProfileID: testProfileID };
            resourceLogic.create(testExternalID, testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new resource if Owner Profile ID is not provided', done => {
            let testResource = { name: 'New Resource' };
            resourceLogic.create(testExternalID, testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new resource if the ExternalID is not valid for the claimed Owner Profile ID', done => {
            let testResource = { name: 'New Resource' };
            resourceLogic.create('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('updates a resource, returning the updated version', done => {
            let testResource = { id: '999', name: 'Updated Resource', ownerProfileID: testProfileID };
            resourceLogic.update(testExternalID, testResource).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Resource');
                expect(response.data.id).toBe('999');
                done();
            });
        });
        it('fails to update a resource if Name is not provided', done => {
            let testResource = { ownerProfileID: testProfileID };
            resourceLogic.update('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a resource if Owner Profile ID is not provided', done => {
            let testResource = { name: 'Updated Resource' };
            resourceLogic.update('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a resource if the External ID is not valid for the claimed Owner Profile ID', done => {
            let testResource = { name: 'Updated Resource' };
            resourceLogic.update('somethingelse', testResource).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to retrieve a resource when no ID is specified', done => {
            resourceLogic.get('').then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
    });
    describe('profile logic', () => {
        let profileLogic;
        let mockBrewData = new mock_data_1.MockDataController();
        let mockRecipeData = new mock_data_1.MockDataController();
        beforeEach(() => {
            profileLogic = new profile_logic_1.ProfileLogic(mockBrewData, mockProfileData, mockRecipeData);
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
            mockRecipeData.setCollection([
                { id: '444', name: 'Test Recipe 1', ownerProfileID: testProfileID },
                { id: '555', name: 'Test Recipe 2', ownerProfileID: testProfileID },
            ]);
            profileLogic.getProfileData(testExternalID, testProfileID).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.brews.length).toBe(3);
                expect(response.data.recipes.length).toBe(2);
                done();
            });
        });
    });
});
//# sourceMappingURL=app.spec.js.map