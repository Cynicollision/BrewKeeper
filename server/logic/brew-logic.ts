import { Brew } from './../../shared/models/Brew';
import { EmptyOperationResponse, OperationResponse } from './../../shared/contracts/OperationResponse';
import { ObjectIDType } from './../../shared/enum/ObjectIDType';
import { IBrewData } from '../data/brew-data';
import { ID } from './../util/object-id';

export interface IBrewLogic {
    create(brew: Brew): Promise<OperationResponse<Brew>>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
    update(brew: Brew): Promise<OperationResponse<Brew>>;
}

export class BrewLogic implements IBrewLogic {
    private brewData: IBrewData;

    constructor(brewData: IBrewData) {
        this.brewData = brewData;
    }

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise<OperationResponse<Brew>>((resolve, reject) => {

            // validate the request
            if (!brewID) {
                resolve({ success: false, message: 'Couldn\'t fetch brew: ID is required.' });
                return;
            }

            return this.brewData.get(brewID)
                .then(response => {
                    resolve({ 
                        success: response.success, 
                        message: response.message,
                        data: response.data,
                    });
                });
            });
    }

    create(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise<OperationResponse<Brew>>((resolve, reject) => {

            // validate the request
            if (!newBrew || !newBrew.name) {
                resolve({ success: false, message: 'Couldn\'t create brew: Name is required.' });
                return;
                
            }

            newBrew.id = ID.new(ObjectIDType.Brew);

            return this.brewData.create(newBrew)
                .then(response => 
                    resolve({ 
                        success: response.success, 
                        message: response.message,
                        data: response.data,
                    })
                );
        });
    }

    update(newBrew: Brew): Promise<OperationResponse<Brew>> {
        return new Promise<OperationResponse<Brew>>((resolve, reject) => {

            // validate the request
            if (!newBrew || !newBrew.name) {
                resolve({ success: false, message: 'Couldn\'t update brew: Name is required.' });
                return;
            }

            return this.brewData.update(newBrew)
                .then(response => 
                    resolve({ 
                        success: response.success, 
                        message: response.message,
                        data: response.data,
                    })
                );
        });
    }
}