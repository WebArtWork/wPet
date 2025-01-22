import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetdoctorsComponent } from './petdoctors.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PetdoctorsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetdoctorsComponent]
})
export class PetdoctorsModule {}
