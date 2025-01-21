import { CrudDocument } from 'wacom';

export interface Petfood extends CrudDocument {
	name: string;
	description: string;
}
