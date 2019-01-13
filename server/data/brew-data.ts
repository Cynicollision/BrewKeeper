import * as mongoose from 'mongoose';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Brew } from './../../shared/models/Brew';
import { ResponseUtil } from '../util/response';

export interface IBrewData {
    get(brewID: string): Promise<OperationResponse<Brew>>;
    getMany(brewIDs: string[]): Promise<OperationResponse<Brew[]>>;
    create(newBrew: Brew): Promise<OperationResponse<Brew>>;
    update(updatedBrew: Brew): Promise<OperationResponse<Brew>>;
}

export class BrewData implements IBrewData {
    
    private BrewModel: mongoose.Model<mongoose.Document> = mongoose.model('Brew', new mongoose.Schema({
        id: { type: 'string', index: true },
        name: { type: 'string' },
    }));

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            this.BrewModel.findOne({ id: brewID }, (err: any, res: mongoose.Document) => {
                if (err) {
                    return resolve(ResponseUtil.fail(err));
                }
                let brew = this.mapBrewFromDocument(res);
                return resolve(ResponseUtil.succeed(brew));
            });
        });
    }

    getMany(brewIDs: string[]): Promise<OperationResponse<Brew[]>> {
        return new Promise((resolve, reject) => {
            // TODO
            let testBrews = brewIDs.map(id => { 
                return { id: id, name: 'Brew ' + id };
            });
            return resolve(ResponseUtil.succeed(testBrews));
        });
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            this.mapBrewToDocument(newBrew).save((err: any) => {
                if (err) {
                    return resolve(ResponseUtil.fail(err));
                }
                return resolve(ResponseUtil.succeed(newBrew));
            });
        });
    }

    update(updatedBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise((resolve, reject) => {
            // TODO
            return resolve(ResponseUtil.succeed(updatedBrew));
        });
    }

    private mapBrewFromDocument(document: any): Brew {
        return {
            id: document.id, 
            name: document.name,
        };
    }
    private mapBrewToDocument(brew: Brew): mongoose.Document {
        return new this.BrewModel(brew);
    }
}
