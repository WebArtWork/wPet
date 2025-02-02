import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetclinicpageComponent } from './petclinicpage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':clinic_id',
		component: PetclinicpageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetclinicpageComponent]
})
export class PetclinicpageModule {}
