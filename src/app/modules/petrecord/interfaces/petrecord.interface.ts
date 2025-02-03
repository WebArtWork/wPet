import { CrudDocument } from 'wacom';

export interface Petrecord extends CrudDocument {
	name: string;
	description: string;
	pet: string; 
	
    date: string,
    disease: string,
    treatment: string,
    procedure: string,
    vetName: string,
    vetContact: string,
    notes: string,
}
