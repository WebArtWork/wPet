import { CrudDocument } from 'wacom';

export interface Petitem extends CrudDocument {
	name: string;
	description: string;
}
