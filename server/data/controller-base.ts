import * as mongoose from 'mongoose';
import { OperationResponse } from '../../shared/contracts/OperationResponse';
import { ResponseUtil } from '../util/response';

export interface IResource<T> {
    get(id: string): Promise<OperationResponse<T>>;
    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<T[]>>;
    create(data: T): Promise<OperationResponse<T>>;
    update(id: string, data: T): Promise<OperationResponse<T>>;
}

export abstract class DataController<T> implements IResource<T> {
    abstract model: mongoose.Model<mongoose.Document>;
    abstract modelName: string;

    abstract mapFromDocument(document: mongoose.Document);

    get(id: string): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err: any, doc: mongoose.Document) => {
                if (err || !doc) {
                    return resolve(ResponseUtil.fail(err || `Invalid ${this.modelName} ID`));
                }
                return resolve(ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    getByOwnerID(ownerProfileID: string): Promise<OperationResponse<T[]>> {
        return new Promise((resolve, reject) => {
            this.model.find({ ownerProfileID: ownerProfileID }, (err: any, docs: mongoose.Document[]) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocuments(docs)));
            });
        });
    }

    create(data: T): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err: any) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(data));
            });
        });
    }

    update(id: string, data: T): Promise<OperationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err: any, doc: mongoose.Document) => {
                return resolve(err ? ResponseUtil.fail(err) : ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }

    protected mapFromDocuments(documents: mongoose.Document[]): T[] {
        return documents.map(doc => this.mapFromDocument(doc));
    }

    protected mapToDocument(brew: T): mongoose.Document {
        return new this.model(brew);
    }
}