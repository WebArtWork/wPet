import { CrudDocument } from 'wacom';

export interface Petstore extends CrudDocument {
	name: string;
	description: string;
	phone: string;
	email: string;
	workingHours: string;
	deliveryOptions: string;
	paymentMethods: string;
	link: string;
}
