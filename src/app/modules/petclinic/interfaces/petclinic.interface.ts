import { CrudDocument } from 'wacom';

export interface Petclinic extends CrudDocument {
	name: string;
	description: string;
	phone: string;
	email: string;
	workingHours: string;

	clinic: string;
}
