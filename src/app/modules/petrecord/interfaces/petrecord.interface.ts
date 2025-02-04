import { CrudDocument } from 'wacom';

export interface Petrecord extends CrudDocument {
	name: string;
	description: string;
	pet: string; 
	
    disease: string,
    treatment: string,
    procedure: string,
    notes: string,
}
