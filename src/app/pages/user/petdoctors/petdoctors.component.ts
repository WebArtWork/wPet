import { Component } from '@angular/core';
import { Petdoctor } from 'src/app/modules/petdoctor/interfaces/petdoctor.interface';
import { PetdoctorService } from 'src/app/modules/petdoctor/services/petdoctor.service';

@Component({
	templateUrl: './petdoctors.component.html',
	styleUrls: ['./petdoctors.component.scss'],
	standalone: false
})
export class PetdoctorsComponent {
	doctors: Petdoctor[] = [];

	constructor(private _petdoctorService: PetdoctorService) {}

	ngOnInit(): void {
		this._petdoctorService
			.get({}, { name: 'public' })
			.subscribe((doctors) => {
				this.doctors = doctors;
			});
	}
}
