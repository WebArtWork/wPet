import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FoodComponent } from './food.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FoodComponent
	},
	{
		path: ':place_id',
		component: FoodComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FoodComponent],
	providers: []
})
export class FoodModule {}
