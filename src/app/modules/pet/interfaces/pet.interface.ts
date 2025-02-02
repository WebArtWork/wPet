import { CrudDocument } from 'wacom';

export interface Pet extends CrudDocument {
	name: string;
	species: string;
	breed: string;
	age: string;
	gender: string;
	description: string;
}
