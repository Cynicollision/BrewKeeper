import { IProfileLogic, ProfileLogic } from '../logic/profile-logic';
import { MockBrewData } from './mock-brew-data';
import { MockProfileData } from './mock-profile-data';
import { MockResourceLogic } from './mock-logic';
import { MockDataController, TestData } from './mock-data';
import { IResourceLogic } from 'logic/logic-base';

describe('brew keeper server', () => {
    let mockProfileData: MockProfileData;
    let testExternalID: string;
    let testProfileID: string;

    beforeEach(() => {
        mockProfileData = new MockProfileData();
        testExternalID = mockProfileData.testExternalID;
        testProfileID = mockProfileData.testProfileID;
    });

    describe('resource logic', () => {
        let mockResourceData: MockDataController;
        let resourceLogic: IResourceLogic<TestData>;

        beforeEach(() => {
            mockResourceData = new MockDataController();
            resourceLogic = new MockResourceLogic(mockResourceData, mockProfileData);
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
        let profileLogic: IProfileLogic;
        let mockBrewData = new MockBrewData();
        let mockRecipeData = new MockDataController();

        beforeEach(() => {
            profileLogic = new ProfileLogic(mockBrewData, mockProfileData, mockRecipeData);

            testExternalID = mockProfileData.testExternalID;
            testProfileID = mockProfileData.testProfileID;
        });

        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });

        it('retrieves profile data by ID and builds summary info', done => {
            mockBrewData.setCollection([
                { id: '111', name: 'Test Brew 1', recipeID: '1000', ownerProfileID: testProfileID, brewDate: 'Mon Dec 21 2015' },
                { id: '222', name: 'Test Brew 2', recipeID: '1000', ownerProfileID: testProfileID, brewDate: 'Thu Sep 08 2016' },
                { id: '333', name: 'Test Brew 3', recipeID: '1000', ownerProfileID: testProfileID, brewDate: 'Fri Apr 06 2018' },
                { id: '444', name: 'Test Brew 4', recipeID: '1000', ownerProfileID: testProfileID, brewDate: 'Thu Feb 14 2019' },
                { id: '555', name: 'Test Brew 5', recipeID: '1001', ownerProfileID: testProfileID, brewDate: 'Sun Jun 30 2019' },
            ]);

            mockRecipeData.setCollection([
                { id: '1000', name: 'Test Recipe 1', ownerProfileID: testProfileID },
                { id: '1001', name: 'Test Recipe 2', ownerProfileID: testProfileID },
            ]);

            profileLogic.getProfileData(testExternalID, testProfileID).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.brews.length).toBe(5);
                expect(response.data.recipes.length).toBe(2);

                expect(response.data.summary.brewCount).toBe(5);
                expect(response.data.summary.recipeCount).toBe(2);
                expect(response.data.summary.brewingSince).toBe('12/21/2015');
                expect(response.data.summary.topRecipe.id).toBe('1000');
                expect(response.data.summary.topRecipeBrewedTimes).toBe(4);

                done();
            });
        });
    });
});
