import { CrudDocument } from 'wacom';

export interface Pet extends CrudDocument {
	name: string;
	thumb: string;
	species: string;
	breed: string;
	age: string;
	gender: string;
	description: string;
	allergies: any;
	adoptable: boolean;

	author: string;
}
