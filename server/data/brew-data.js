"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const response_1 = require("../util/response");
class BrewData {
    constructor() {
        this.model = mongoose.model('Brew', new mongoose.Schema({
            id: { type: 'string', index: true },
            ownerProfileID: { type: 'string', index: true },
            name: { type: 'string' },
            recipeID: { type: 'string' },
            brewDate: { type: 'string' },
            bottleDate: { type: 'string' },
            chillDate: { type: 'string' },
            notes: { type: 'string' },
        }));
    }
    get(id) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err, doc) => {
                if (err || !doc) {
                    return resolve(response_1.ResponseUtil.fail(err || 'Invalid Brew ID'));
                }
                return resolve(response_1.ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }
    getByOwnerID(ownerProfileID) {
        return new Promise((resolve, reject) => {
            this.model.find({ ownerProfileID: ownerProfileID }, (err, docs) => {
                return resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed(this.mapFromDocuments(docs)));
            });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.mapToDocument(data).save((err) => {
                return resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed(data));
            });
        });
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({ id: id }, data, { new: true }, (err, doc) => {
                return resolve(err ? response_1.ResponseUtil.fail(err) : response_1.ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }
    mapFromDocument(document) {
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
    mapFromDocuments(documents) {
        return documents.map(doc => this.mapToDocument(doc));
    }
    mapToDocument(brew) {
        return new this.model(brew);
    }
}
exports.BrewData = BrewData;
//# sourceMappingURL=brew-data.js.map