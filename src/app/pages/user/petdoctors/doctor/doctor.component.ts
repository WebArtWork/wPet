import { Component, Input } from '@angular/core';
import { Petdoctor } from 'src/app/modules/petdoctor/interfaces/petdoctor.interface';

@Component({
	selector: 'app-doctor',
	standalone: false,

	templateUrl: './doctor.component.html',
	styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
	@Input() doctor: Petdoctor;
}
