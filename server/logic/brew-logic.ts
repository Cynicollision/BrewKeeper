import { Brew } from './../../shared/models/Brew';
import { EmptyOperationResponse, OperationResponse } from './../../shared/contracts/OperationResponse';
import { ObjectIDType } from './../../shared/enum/ObjectIDType';
import { IBrewData } from '../data/brew-data';
import { ID } from './../util/object-id';

export interface IBrewLogic {
    create(brewName: string): Promise<EmptyOperationResponse>;
    get(brewID: string): Promise<OperationResponse<Brew>>;
}

export class BrewLogic implements IBrewLogic {
    private brewData: IBrewData;

    constructor(brewData: IBrewData) {
        this.brewData = brewData;
    }

    create(brewName: string): Promise<EmptyOperationResponse> {
        return new Promise<EmptyOperationResponse>((resolve, reject) => {

            // validate the request
            if (!brewName) {
                resolve({ success: false, message: 'Brew name is required.' });
            }

            let brewID = ID.new(ObjectIDType.Brew);

            let newBrew = new Brew();
            newBrew.id = brewID;
            newBrew.name = brewName;

            return this.brewData.create(newBrew)
                .then(response => 
                    resolve({ 
                        success: response.success, 
                        message: response.message,
                    })
                );
        });
    }

    get(brewID: string): Promise<OperationResponse<Brew>> {
        return new Promise<OperationResponse<Brew>>((resolve, reject) => {

            // validate the request
            if (!brewID) {
                return resolve({ success: false, message: 'Brew ID is required.' });
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
}