"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brew_logic_1 = require("../logic/brew-logic");
const profile_logic_1 = require("../logic/profile-logic");
const recipe_logic_1 = require("../logic/recipe-logic");
const mock_brew_data_1 = require("./mock-brew-data");
const mock_profile_data_1 = require("./mock-profile-data");
const mock_recipe_data_1 = require("./mock-recipe-data");
describe('brew keeper server', () => {
    let mockBrewData;
    let mockProfileData;
    let mockRecipeData;
    let recipeLogic;
    let testExternalID;
    let testProfileID;
    beforeEach(() => {
        mockBrewData = new mock_brew_data_1.MockBrewData();
        mockProfileData = new mock_profile_data_1.MockProfileData();
        mockRecipeData = new mock_recipe_data_1.MockRecipeData();
        testExternalID = mockProfileData.testExternalID;
        testProfileID = mockProfileData.testProfileID;
    });
    describe('brew logic', () => {
        beforeEach(() => {
            recipeLogic = new brew_logic_1.BrewLogic(mockBrewData, mockProfileData);
        });
        it('can be instantiated', () => {
            expect(recipeLogic).toBeTruthy();
        });
        it('retrieves a brew by ID', done => {
            recipeLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });
        it('creates a new brew, returning it with a populated ID', done => {
            let testBrew = { name: 'New Brew', ownerProfileID: testProfileID };
            recipeLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });
        it('fails to create a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: testProfileID };
            recipeLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new brew if Owner Profile ID is not provided', done => {
            let testBrew = { name: 'New Brew' };
            recipeLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new brew if the ExternalID is not valid for the claimed Owner Profile ID', done => {
            let testBrew = { name: 'New Brew' };
            recipeLogic.create('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('updates a brew, returning the updated version', done => {
            let testBrew = { id: '999', name: 'Updated Brew', ownerProfileID: testProfileID };
            recipeLogic.update(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Brew');
                expect(response.data.id).toBe('999');
                done();
            });
        });
        it('fails to update a brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: testProfileID };
            recipeLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a brew if Owner Profile ID is not provided', done => {
            let testBrew = { name: 'Updated Brew' };
            recipeLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a brew if the External ID is not valid for the claimed Owner Profile ID', done => {
            let testBrew = { name: 'Updated Brew' };
            recipeLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to retrieve a brew when no ID is specified', done => {
            recipeLogic.get('').then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
    });
    describe('profile logic', () => {
        let profileLogic;
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
    describe('recipe logic', () => {
        beforeEach(() => {
            recipeLogic = new recipe_logic_1.RecipeLogic(mockRecipeData, mockProfileData);
        });
        it('can be instantiated', () => {
            expect(recipeLogic).toBeTruthy();
        });
        it('retrieves a recipe by ID', done => {
            recipeLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });
        it('creates a new recipe, returning it with a populated ID', done => {
            let testRecipe = { name: 'New Recipe', ownerProfileID: testProfileID };
            recipeLogic.create(testExternalID, testRecipe).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Recipe');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });
        it('fails to create a new recipe if Name is not provided', done => {
            let testRecipe = { ownerProfileID: testProfileID };
            recipeLogic.create(testExternalID, testRecipe).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new recipe if Owner Profile ID is not provided', done => {
            let testRecipe = { name: 'New Recipe' };
            recipeLogic.create(testExternalID, testRecipe).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to create a new recipe if the ExternalID is not valid for the claimed Owner Profile ID', done => {
            let testRecipe = { name: 'New Recipe' };
            recipeLogic.create('somethingelse', testRecipe).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('updates a recipe, returning the updated version', done => {
            let testRecipe = { id: '999', name: 'Updated Recipe', ownerProfileID: testProfileID };
            recipeLogic.update(testExternalID, testRecipe).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Recipe');
                expect(response.data.id).toBe('999');
                done();
            });
        });
        it('fails to update a recipe if Name is not provided', done => {
            let testRecipe = { ownerProfileID: testProfileID };
            recipeLogic.update('somethingelse', testRecipe).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a recipe if Owner Profile ID is not provided', done => {
            let testRecipe = { name: 'Updated Recipe' };
            recipeLogic.update('somethingelse', testRecipe).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to update a recipe if the External ID is not valid for the claimed Owner Profile ID', done => {
            let testRecipe = { name: 'Updated Recipe' };
            recipeLogic.update('somethingelse', testRecipe).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
        it('fails to retrieve a recipe when no ID is specified', done => {
            recipeLogic.get('').then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
    });
});
//# sourceMappingURL=app.spec.js.map