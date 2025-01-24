import { CrudDocument } from 'wacom';

export interface Petclinic extends CrudDocument {
	name: string;
	description: string;
	clinic: string;
}
