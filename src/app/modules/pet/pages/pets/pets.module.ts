import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetsComponent } from './pets.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PetsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetsComponent],
	providers: []
})
export class PetsModule {}
