import { Brew } from '../../shared/models/Brew';
import { IResourceLogic, ResourceLogic } from './logic-base';
import { IBrewData } from '../data/brew-data';
import { IProfileData } from '../data/profile-data';
import { ObjectType } from '../enum/object-type';

export interface IBrewLogic extends IResourceLogic<Brew> {
}

export class BrewLogic extends ResourceLogic<Brew> implements IBrewLogic {

    constructor(brewData: IBrewData, profileData: IProfileData) {
        let config = { name: 'Brew', objectType: ObjectType.Brew };
        super(brewData, profileData, config);
    }
}