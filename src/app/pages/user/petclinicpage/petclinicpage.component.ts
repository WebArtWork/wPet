import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetclinicService } from 'src/app/modules/petclinic/services/petclinic.service';

@Component({
	templateUrl: './petclinicpage.component.html',
	styleUrls: ['./petclinicpage.component.scss'],
	standalone: false
})
export class PetclinicpageComponent {
	petclinic = this._petclinicService.doc(
		this._router.url.replace('/petclinicpage/', '')
	);

	constructor(
		private _petclinicService: PetclinicService,
		private _router: Router
	) {}
}
