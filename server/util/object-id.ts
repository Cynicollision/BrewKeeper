import * as uniqid from 'uniqid';
import { ObjectIDType } from '../enum/ObjectIDType';

export class ID {

    static new(type: ObjectIDType): string {
        return (type || 'XX') + uniqid();
    }
}