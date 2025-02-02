import { CrudDocument } from 'wacom';

export interface Petdoctor extends CrudDocument {
	name: string;
	specialization: string;
	phone: string;
	email: string;
	workingHours: string;
	description: string;

	clinic: string;
}
