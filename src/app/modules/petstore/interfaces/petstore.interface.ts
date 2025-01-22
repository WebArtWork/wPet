import { CrudDocument } from 'wacom';

export interface Petstore extends CrudDocument {
	name: string;
	description: string;
}
