import { Injectable } from '@angular/core';
import { Petrecord } from '../interfaces/petrecord.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class PetrecordService extends CrudService<Petrecord> {
	constructor() {
		super({
			name: 'petrecord'
		});
	}
}
