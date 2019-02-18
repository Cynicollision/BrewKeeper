import * as mongoose from 'mongoose';
import { Brew } from '../../shared/models/Brew';
import { ResourceController, IResourceController } from './controller-base';

export interface IBrewData extends IResourceController<Brew> {
}

export class BrewData extends ResourceController<Brew> implements IBrewData {
    modelName = 'Brew';
    
    model: mongoose.Model<mongoose.Document> = mongoose.model('Brew', new mongoose.Schema({
        id: { type: 'string', index: true },
        ownerProfileID: { type: 'string', index: true},
        name: { type: 'string' },
        recipeID: { type: 'string' },
        brewDate: { type: 'string' },
        bottleDate: { type: 'string' },
        chillDate: { type: 'string' },
        notes: { type: 'string' },
    }));

    mapFromDocument(document: mongoose.Document): Brew {
        return {
            id: document.get('id'),
            ownerProfileID: document.get('ownerProfileID'),
            name: document.get('name'),
            recipeID: document.get('recipeID'),
            brewDate: document.get('brewDate'),
            bottleDate: document.get('bottleDate'),
            chillDate: document.get('chillDate'),
            notes: document.get('notes'),
        };
    }
}
