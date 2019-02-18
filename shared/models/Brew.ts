import { ResourceBase } from './ResourceBase';
export interface Brew extends ResourceBase {
    recipeID?:string;
    brewDate?: string;
    bottleDate?: string;
    chillDate?: string;
    notes?: string;
}