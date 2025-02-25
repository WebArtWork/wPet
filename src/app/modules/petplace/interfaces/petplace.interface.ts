import { CrudDocument } from 'wacom';

export interface Petplace extends CrudDocument {
	name: string;
	description: string;
	clinic: string;
	store: string;
	address: string;
	latitude: string;
	longitude: string;
	placeType: string;
	link: string;
}
