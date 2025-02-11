import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetstoreComponent } from './petstore.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { SelectPetdrugComponent } from 'src/app/modules/petdrug/selectors/petdrug/petdrug-selector.component';
import { SelectPetfoodComponent } from 'src/app/modules/petfood/selectors/petfood/petfood-selector.component';
import { SelectPetitemComponent } from 'src/app/modules/petitem/selectors/petitem/petitem-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PetstoreComponent
	},
	{
		path: ':drug_id',
		component: PetstoreComponent
	},
	{
		path: ':food_id',
		component: PetstoreComponent
	},
	{
		path: ':item_id',
		component: PetstoreComponent
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
	declarations: [PetstoreComponent, StoreListComponent]
})
export class PetstoreModule {}
