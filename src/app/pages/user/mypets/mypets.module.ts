import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MypetsComponent } from './mypets.component';
import { Routes, RouterModule } from '@angular/router';
import { PetComponent } from './pet/pet.component';

const routes: Routes = [
	{
		path: '',
		component: MypetsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MypetsComponent, PetComponent]
})
export class MypetsModule {}
