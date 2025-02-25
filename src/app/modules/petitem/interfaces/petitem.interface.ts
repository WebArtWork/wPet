import { CrudDocument } from 'wacom';

export interface Petitem extends CrudDocument {
	name: string;
	description: string;
	place: string;
	itemtype: string;
	material: string;
	price: string;
	purchasedate: string;
	link: string;
}
