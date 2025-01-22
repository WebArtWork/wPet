import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PlacesComponent } from './places.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PlacesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PlacesComponent],
	providers: []
})
export class PlacesModule {}
