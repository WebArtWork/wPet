import { CrudDocument } from 'wacom';

export interface Petallergy extends CrudDocument {
	name: string;
	description: string;
	pet: string;
}
