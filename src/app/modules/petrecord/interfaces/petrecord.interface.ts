import { CrudDocument } from 'wacom';

export interface Petrecord extends CrudDocument {
	name: string;
	description: string;
	pet: string; 
}
