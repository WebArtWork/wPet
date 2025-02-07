import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetdoctorsComponent } from './petdoctors.component';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { SelectUserComponent } from 'src/app/modules/petclinic/selectors/petclinic/petclinic-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PetdoctorsComponent
	},
	{
		path: ':clinic_id',
		component: PetdoctorsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectUserComponent],
	declarations: [PetdoctorsComponent, DoctorComponent]
})
export class PetdoctorsModule {}
