import { CrudDocument } from 'wacom';

export interface Petplace extends CrudDocument {
	name: string;
	description: string;
}
