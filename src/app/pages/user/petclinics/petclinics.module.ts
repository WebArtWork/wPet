import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetclinicsComponent } from './petclinics.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PetclinicsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetclinicsComponent]
})
export class PetclinicsModule {}
