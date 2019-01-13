import { Profile } from './Profile';

export interface ProfileSession {
    token: string;
    profile: Profile;
}