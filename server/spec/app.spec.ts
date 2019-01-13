import { BrewLogic, IBrewLogic } from '../logic/brew-logic';
import { IProfileLogic, ProfileLogic } from '../logic/profile-logic';
import { MockBrewData } from './mock-brew-data';
import { MockProfileData } from './mock-profile-data';
import { ProfileSession } from '../../shared/models/ProfileSession';

describe('brew keeper server', () => {
    let mockSession: ProfileSession;

    describe('brew logic', () => {
        let brewLogic: IBrewLogic;

        beforeEach(() => {
            brewLogic = new BrewLogic(new MockBrewData());
            mockSession = { 
                token: 'test_token', 
                profile: { 
                    externalID: 'testExternalID',
                    id: 'testProfileID', 
                    name: 'Test User',
                },
            };
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
            brewLogic.create(mockSession, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });

        it('fails to save a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: '123' };
            brewLogic.create(mockSession, testBrew).then(response => {
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
            mockSession = { 
                token: 'test_token', 
                profile: { 
                    externalID: 'testExternalID',
                    id: 'testProfileID', 
                    name: 'Test User',
                },
            };
        });

        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });
    });
});
