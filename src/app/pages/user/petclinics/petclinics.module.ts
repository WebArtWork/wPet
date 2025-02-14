import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetclinicsComponent } from './petclinics.component';
import { Routes, RouterModule } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';
import { SelectPetdrugComponent } from 'src/app/modules/petdrug/selectors/petdrug/petdrug-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PetclinicsComponent
	},
	{
		path: ':clinic_drug',
		component: PetclinicsComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		SelectPetdrugComponent
	],
	declarations: [PetclinicsComponent, ClinicComponent]
})
export class PetclinicsModule {}
