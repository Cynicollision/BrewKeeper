"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../util/response");
class ResourceController {
    get(id) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err, doc) => {
                if (err || !doc) {
                    resolve(response_1.ResponseUtil.fail(err || `Invalid ${this.modelName} ID`));
                }
                resolve(response_1.ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }
    getByOwnerID(ownerProfileID) {
        return new Promise((resolve, reject) => {
            this.model.find({ ownerProfileID: ownerProfileID }, (err, docs) => {
                resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed(this.mapFromDocuments(docs)));
            });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err) => {
                resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed(data));
            });
        });
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err, doc) => {
                resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.model.findOneAndDelete({ id: id }, (err, res) => {
                resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed());
            });
        });
    }
    mapFromDocuments(documents) {
        return documents.map(doc => this.mapFromDocument(doc));
    }
    mapToDocument(brew) {
        return new this.model(brew);
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=controller-base.js.map