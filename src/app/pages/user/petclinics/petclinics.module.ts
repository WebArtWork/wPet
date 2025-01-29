import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetclinicsComponent } from './petclinics.component';
import { Routes, RouterModule } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';

const routes: Routes = [
	{
		path: '',
		component: PetclinicsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetclinicsComponent, ClinicComponent]
})
export class PetclinicsModule {}
