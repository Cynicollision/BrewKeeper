import * as mongoose from 'mongoose';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { Profile } from './../../shared/models/Profile';
import { ResponseUtil } from '../util/response';

export interface IProfileData {
    get(id: string): Promise<OperationResponse<Profile>>;
    getByExternalID(externalID: string): Promise<OperationResponse<Profile>>;
    create(data: Profile): Promise<OperationResponse<Profile>>;
    update(id: string, data: Profile): Promise<OperationResponse<Profile>>;
}

export class ProfileData implements IProfileData {
    
    private model: mongoose.Model<mongoose.Document> = mongoose.model('Profile', new mongoose.Schema({
        id: { type: 'string', index: true },
        externalID: { type: 'string', index: true },
        name: { type: 'string' },
    }));

    get(id: string): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err: any, doc: mongoose.Document) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    getByExternalID(externalID: string): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ externalID: externalID }, (err: any, doc: mongoose.Document) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    create(data: Profile): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err: any) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(data));
            });
        });
    }

    update(id: string, data: Profile): Promise<OperationResponse<Profile>> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err: any, doc: mongoose.Document) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    private mapFromDocument(document: mongoose.Document): Profile {
        if (!document) {
            return null;
        }
        
        return {
            id: document.get('id'),
            externalID: document.get('externalID'),
            name: document.get('name'),
        };
    }

    private mapToDocument(profile: Profile): mongoose.Document {
        return new this.model(profile);
    }
}
