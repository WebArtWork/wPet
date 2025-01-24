import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ItemsComponent } from './items.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ItemsComponent
	},
	{
		path: ':place_id',
		component: ItemsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ItemsComponent],
	providers: []
})
export class ItemsModule {}
