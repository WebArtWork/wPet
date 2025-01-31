import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetprofileComponent } from './petprofile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':pet_id',
		component: PetprofileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetprofileComponent]
})
export class PetprofileModule {}
