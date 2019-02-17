import * as mongoose from 'mongoose';
import { DataController, IResource } from './controller-base';
import { Recipe } from '../../shared/models/Recipe';

export interface IRecipeData extends IResource<Recipe> {
}

export class RecipeData extends DataController<Recipe> {
    modelName = 'Recipe';
    
    model: mongoose.Model<mongoose.Document> = mongoose.model('Recipe', new mongoose.Schema({
        id: { type: 'string', index: true },
        ownerProfileID: { type: 'string', index: true},
        name: { type: 'string' },
        description: { type: 'string' },
    }));

    mapFromDocument(document: mongoose.Document): Recipe {
        return {
            id: document.get('id'),
            ownerProfileID: document.get('ownerProfileID'),
            name: document.get('name'),
            description: document.get('notes'),
        };
    }
}
