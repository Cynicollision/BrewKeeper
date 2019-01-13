import { BrewLogic, IBrewLogic } from '../logic/brew-logic';
import { MockBrewData } from './mock-brew-data';

describe('brew keeper server', () => {

    describe('brew logic', () => {
        let brewLogic: IBrewLogic;

        beforeEach(() => {
            brewLogic = new BrewLogic(new MockBrewData());
        });

        it('retrieves a brew by ID', done => {
            brewLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });

        it('saves a new brew, returning it with a populated ID', done => {
            let testBrew = { name: 'New Brew' };
            brewLogic.create(testBrew).then(response => {
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });

        it('fails to retrieve a brew when no ID is specified', done => {
            brewLogic.get('').then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });
    });
});
