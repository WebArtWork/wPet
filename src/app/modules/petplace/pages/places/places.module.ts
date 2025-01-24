import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PlacesComponent } from './places.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PlacesComponent
	},
	{
		path: 'clinic/:clinic_id',
		component: PlacesComponent
	},
	{
		path: 'store/:store_id',
		component: PlacesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PlacesComponent],
	providers: []
})
export class PlacesModule {}
