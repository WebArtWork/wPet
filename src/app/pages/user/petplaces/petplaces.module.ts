import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetplacesComponent } from './petplaces.component';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places/places.component';

const routes: Routes = [
	{
		path: '',
		component: PetplacesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetplacesComponent, PlacesComponent]
})
export class PetplacesModule {}
