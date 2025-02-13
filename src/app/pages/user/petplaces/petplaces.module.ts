import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetplacesComponent } from './petplaces.component';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { SelectPetdrugComponent } from 'src/app/modules/petdrug/selectors/petdrug/petdrug-selector.component';
import { SelectPetfoodComponent } from 'src/app/modules/petfood/selectors/petfood/petfood-selector.component';
import { SelectPetitemComponent } from 'src/app/modules/petitem/selectors/petitem/petitem-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PetplacesComponent
	},
	{
		path: ':place_drug',
		component: PetplacesComponent
	},
	{
		path: ':place_food',
		component: PetplacesComponent
	},
	{
		path: ':place_item',
		component: PetplacesComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		SelectPetdrugComponent,
		SelectPetfoodComponent,
		SelectPetitemComponent
	],
	declarations: [PetplacesComponent, PlacesComponent]
})
export class PetplacesModule {}
