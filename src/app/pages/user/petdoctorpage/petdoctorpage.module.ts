import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetdoctorpageComponent } from './petdoctorpage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':doctor_id',
		component: PetdoctorpageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetdoctorpageComponent]
})
export class PetdoctorpageModule {}
