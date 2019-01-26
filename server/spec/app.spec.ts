import { BrewLogic, IBrewLogic } from '../logic/brew-logic';
import { IProfileLogic, ProfileLogic } from '../logic/profile-logic';
import { MockBrewData } from './mock-brew-data';
import { MockProfileData } from './mock-profile-data';
import { IBrewData } from 'data/brew-data';
import { IProfileData } from 'data/profile-data';

describe('brew keeper server', () => {
    let mockBrewData: MockBrewData;
    let mockProfileData: MockProfileData;
    let brewLogic: IBrewLogic;

    let testExternalID: string;
    let testProfileID: string;

    beforeEach(() => {
        mockBrewData = new MockBrewData();
        mockProfileData = new MockProfileData();

        testExternalID = mockProfileData.testExternalID;
        testProfileID = mockProfileData.testProfileID;
    });

    describe('brew logic', () => {

        beforeEach(() => {
            brewLogic = new BrewLogic(mockBrewData, mockProfileData);
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
            let testBrew = { name: 'New Brew', ownerProfileID: testProfileID };
            brewLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('New Brew');
                expect(response.data.id).toBeTruthy();
                done();
            });
        });

        it('fails to create a new brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: testProfileID };
            brewLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to create a new brew if Owner Profile ID is not provided', done => {
            let testBrew = { name: 'New Brew' };
            brewLogic.create(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to create a new brew if the ExternalID is not valid for the claimed Owner Profile ID', done => {
            let testBrew = { name: 'New Brew' };
            brewLogic.create('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('updates a brew, returning the updated version', done => {
            let testBrew = { id: '999', name: 'Updated Brew', ownerProfileID: testProfileID };
            brewLogic.update(testExternalID, testBrew).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.name).toBe('Updated Brew');
                expect(response.data.id).toBe('999');
                done();
            });
        });

        it('fails to update a brew if Name is not provided', done => {
            let testBrew = { ownerProfileID: testProfileID };
            brewLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to update a brew if Owner Profile ID is not provided', done => {
            let testBrew = { name: 'Updated Brew' };
            brewLogic.update('somethingelse', testBrew).then(response => {
                expect(response.success).toBe(false);
                done();
            });
        });

        it('fails to update a brew if the External ID is not valid for the claimed Owner Profile ID', done => {
            let testBrew = { name: 'Updated Brew' };
            brewLogic.update('somethingelse', testBrew).then(response => {
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
            profileLogic = new ProfileLogic(mockBrewData, mockProfileData);

            testExternalID = mockProfileData.testExternalID;
            testProfileID = mockProfileData.testProfileID;
        });

        it('can be instantiated', () => {
            expect(profileLogic).toBeTruthy();
        });

        it('retrieves profile data by ID', done => {
            mockBrewData.setCollection([
                { id: '111', name: 'Test Brew 1', ownerProfileID: testProfileID },
                { id: '222', name: 'Test Brew 2', ownerProfileID: testProfileID },
                { id: '333', name: 'Test Brew 3', ownerProfileID: testProfileID },
            ]);

            profileLogic.getProfileData(testExternalID, testProfileID).then(response => {
                expect(response.success).toBe(true);
                expect(response.data.brews.length).toBe(3);

                done();
            });
        });
    });
});
