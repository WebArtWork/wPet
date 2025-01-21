import { CrudDocument } from 'wacom';

export interface Pet extends CrudDocument {
	name: string;
	description: string;
}
