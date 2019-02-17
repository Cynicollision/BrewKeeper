"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockRecipeData {
    constructor() {
        this.collection = [];
    }
    setCollection(recipes) {
        this.collection = recipes;
    }
    get(recipeID) {
        return new Promise((resolve, reject) => {
            let testRecipe = { id: recipeID, name: 'Test Recipe' };
            return resolve({ success: true, data: testRecipe });
        });
    }
    getByOwnerID(ownerProfileID) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: this.collection });
        });
    }
    create(newRecipe) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: newRecipe });
        });
    }
    update(recipeID, updatedBrew) {
        return new Promise((resolve, reject) => {
            return resolve({ success: true, data: updatedBrew });
        });
    }
}
exports.MockRecipeData = MockRecipeData;
//# sourceMappingURL=mock-recipe-data.js.map