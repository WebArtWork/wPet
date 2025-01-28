import { Component } from '@angular/core';
import { Petdoctor } from 'src/app/modules/petdoctor/interfaces/petdoctor.interface';
import { PetdoctorService } from 'src/app/modules/petdoctor/services/petdoctor.service';

@Component({
	templateUrl: './petdoctors.component.html',
	styleUrls: ['./petdoctors.component.scss'],
	standalone: false
})
export class PetdoctorsComponent {
	get doctors(): Petdoctor[] {
		return this._petdoctorService.doctors;
	}

	constructor(private _petdoctorService: PetdoctorService) {}
}
