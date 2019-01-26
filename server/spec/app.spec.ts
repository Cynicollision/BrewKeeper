import { BrewLogic, IBrewLogic } from '../logic/brew-logic';
import { IProfileLogic, ProfileLogic } from '../logic/profile-logic';
import { MockBrewData } from './mock-brew-data';
import { MockProfileData } from './mock-profile-data';

describe('brew keeper server', () => {
    let testProfileExternalID = 'testOwner';

    describe('brew logic', () => {
        let brewLogic: IBrewLogic;

        beforeEach(() => {
            brewLogic = new BrewLogic(new MockBrewData(), new MockProfileData());
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

        it('creates a new brew, returning it with a populated ID', done => {
            let testBrew = { name: 'New Brew', ownerProfileID: 'Test ID' };
            brewLogic.create(testProfileExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });

        it('fails to create a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: '123' };
            brewLogic.create(testProfileExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to create a new brew if owner profile ID is not provided', done => {
            let testBrew = { name: 'New Brew' };
            brewLogic.create(testProfileExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('updates a brew, returning the updated version', done => {
            let testBrew = { id: '999', name: 'Updated Brew', ownerProfileID: 'Test ID' };
            brewLogic.update(testProfileExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Brew');
                expect(response.data.id).toBe('999');
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
        });

        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });
    });
});
