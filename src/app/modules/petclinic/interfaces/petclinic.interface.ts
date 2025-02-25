import { CrudDocument } from 'wacom';

export interface Petclinic extends CrudDocument {
	name: string;
	description: string;
	address: string;
	phone: string;
	email: string;
	workingHours: string;
	link: string;
}
