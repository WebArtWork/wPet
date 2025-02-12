import { CrudDocument } from 'wacom';

export interface Petstore extends CrudDocument {
	name: string;
	phone: string;
	email: string;
	workingHours: string;
	deliveryOptions: string;
	paymentMethods: string;
	description: string;

	link: string;
}
