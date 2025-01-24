import { CrudDocument } from 'wacom';

export interface Petdrug extends CrudDocument {
	name: string;
	description: string;
	place: string;
}
