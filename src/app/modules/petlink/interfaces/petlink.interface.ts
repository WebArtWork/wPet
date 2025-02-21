import { CrudDocument } from 'wacom';

export interface Petlink extends CrudDocument {
	name: string;
	description: string;
	type: string;
}
