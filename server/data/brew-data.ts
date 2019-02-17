import * as mongoose from 'mongoose';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Brew } from '../../shared/models/Brew';
import { ResponseUtil } from '../util/response';

export interface IBrewData {
    get(id: string): Promise<OperationResponse<Brew>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>>;
    create(data: Brew): Promise<OperationResponse<Brew>>;
    update(id: string, data: Brew): Promise<OperationResponse<Brew>>;
}

export class BrewData implements IBrewData {
    
    private model: mongoose.Model<mongoose.Document> = mongoose.model('Brew', new mongoose.Schema({
        id: { type: 'string', index: true },
        ownerProfileID: { type: 'string', index: true},
        name: { type: 'string' },
        recipeID: { type: 'string' },
        brewDate: { type: 'string' },
        bottleDate: { type: 'string' },
        chillDate: { type: 'string' },
        notes: { type: 'string' },
    }));

    get(id: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err: any, doc: mongoose.Document) => {
                if (err || !doc) {
                    return resolve(ResponseUtil.fail(err || 'Invalid Brew ID'));
                }
                return resolve(ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<Brew[]>> {
        return new Promise((resolve, reject) => {
            this.model.find({ ownerProfileID: ownerProfileID }, (err: any, docs: mongoose.Document[]) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocuments(docs)));
            });
        });
    }

    create(data: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err: any) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(data));
            });
        });
    }

    update(id: string, data: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err: any, doc: mongoose.Document) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    private mapFromDocument(document: mongoose.Document): Brew {
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

    private mapFromDocuments(documents: mongoose.Document[]): Brew[] {
        return documents.map(doc => this.mapToDocument(doc));
    }

    private mapToDocument(brew: Brew): mongoose.Document {
        return new this.model(brew);
    }
}
