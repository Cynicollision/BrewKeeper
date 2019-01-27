"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const response_1 = require("../util/response");
class ProfileData {
    constructor() {
        this.model = mongoose.model('Profile', new mongoose.Schema({
            id: { type: 'string', index: true },
            externalID: { type: 'string', index: true },
            name: { type: 'string' },
        }));
    }
    get(id) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ id: id }, (err, doc) => {
                if (err || !doc) {
                    return resolve(response_1.ResponseUtil.fail(err || 'Invalid Profile ID'));
                }
                return resolve(response_1.ResponseUtil.succeed(this.mapFromDocument(doc)));
            });
        });
    }
    getByExternalID(externalID) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ externalID: externalID }, (err, doc) => {
                if (err || !doc) {
                    return resolve(response_1.ResponseUtil.fail(err || 'Invalid External ID'));
                }
                return resolve(response_1.ResponseUtil.succeed(this.mapFromDocument(doc)));
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
        if (!document) {
            return null;
        }
        return {
            id: document.get('id'),
            externalID: document.get('externalID'),
            name: document.get('name'),
        };
    }
    mapToDocument(profile) {
        return new this.model(profile);
    }
}
exports.ProfileData = ProfileData;
//# sourceMappingURL=profile-data.js.map