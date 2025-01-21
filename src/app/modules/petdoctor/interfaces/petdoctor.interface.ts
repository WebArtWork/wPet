import { CrudDocument } from 'wacom';

export interface Petdoctor extends CrudDocument {
	name: string;
	description: string;
}
