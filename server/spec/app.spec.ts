import { BrewLogic, IBrewLogic } from '../logic/brew-logic';
import { IProfileLogic, ProfileLogic } from '../logic/profile-logic';
import { MockBrewData } from './mock-brew-data';
import { MockProfileData } from './mock-profile-data';

describe('brew keeper server', () => {
    let testSessionProfileID: string;

    describe('brew logic', () => {
        let brewLogic: IBrewLogic;

        beforeEach(() => {
            brewLogic = new BrewLogic(new MockBrewData());
            testSessionProfileID = 'testProfileID';
        });

        it('can be instantiated', () => {
            expect(brewLogic).toBeTruthy();
        });

        it('retrieves a brew by ID', done => {
            brewLogic.get('123').then(response => {
                expect(response.success).toBe(true);
                expect(response.data).toBeDefined();
                done();
            });
        });

        it('saves a new brew, returning it with a populated ID', done => {
            let testBrew = { name: 'New Brew', ownerProfileID: '123' };
            brewLogic.create(testSessionProfileID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });

        it('fails to save a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: '123' };
            brewLogic.create(testSessionProfileID, testBrew).then(response => {
                expect(response.success).toBe(false);
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

    describe('profile logic', () => {
        let profileLogic: IProfileLogic;

        beforeEach(() => {
            profileLogic = new ProfileLogic(new MockProfileData());
            testSessionProfileID = 'testProfileID';
        });

        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });
    });
});
