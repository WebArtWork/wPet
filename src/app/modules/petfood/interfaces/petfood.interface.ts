import { CrudDocument } from 'wacom';

export interface Petfood extends CrudDocument {
	name: string;
	description: string;
	place: string;
	foodbrand: string;
	foodtype: string;
	flavor: string;
	quantity: string;
	feedinginstructions: string;
	link: string;
}
