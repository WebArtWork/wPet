import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetdoctorService } from 'src/app/modules/petdoctor/services/petdoctor.service';

@Component({
	templateUrl: './petdoctorpage.component.html',
	styleUrls: ['./petdoctorpage.component.scss'],
	standalone: false
})
export class PetdoctorpageComponent {
	petprofile = this._petdoctorService.doc(
		this._router.url.replace('/petdoctorpage/', '')
	);

	constructor(
		private _petdoctorService: PetdoctorService,
		private _router: Router
	) {}
}
