import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetprofileComponent } from './petprofile.component';
import { Routes, RouterModule } from '@angular/router';
import { PetallergySelectorComponent } from 'src/app/modules/petallergy/selectors/petallergy/petallergy-selector.component';
import { AllergiesComponent } from './allergies/allergies.component';

const routes: Routes = [
	{
		path: ':pet_id',
		component: PetprofileComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		PetallergySelectorComponent
	],
	declarations: [PetprofileComponent, AllergiesComponent]
})
export class PetprofileModule {}
