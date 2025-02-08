import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetstoreComponent } from './petstore.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { SelectUserComponentDrug } from 'src/app/modules/petdrug/selectors/petdrug/petdrug-selector.component';
import { SelectUserComponentFood } from 'src/app/modules/petfood/selectors/petfood/petfood-selector.component';
import { SelectUserComponentItem } from 'src/app/modules/petitem/selectors/petitem/petitem-selector.component';

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
		SelectUserComponentDrug,
		SelectUserComponentFood,
		SelectUserComponentItem
	],
	declarations: [PetstoreComponent, StoreListComponent]
})
export class PetstoreModule {}
