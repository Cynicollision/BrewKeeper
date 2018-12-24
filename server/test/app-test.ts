import { BrewLogic, IBrewLogic } from './../logic/brew-logic';
import { MockBrewData } from './mock-brew-data';

describe('brew keeper server', () => {
    let brewLogic: IBrewLogic;

    beforeEach(() => {
        brewLogic = buildTestAppLogic();
    });

    it('has one test', () => {
        expect(brewLogic).toBeTruthy();
    });
});

function buildTestAppLogic(): IBrewLogic {
    return new BrewLogic(new MockBrewData());
}