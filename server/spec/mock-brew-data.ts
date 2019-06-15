import { Brew } from '../../shared/models/Brew';
import { MockDataController } from './mock-data';

export class MockBrewData extends MockDataController {

    setCollection(data: Brew[]): void {
        this.collection = data;
    }
}