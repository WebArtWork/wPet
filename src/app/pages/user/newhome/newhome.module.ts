import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { NewhomeComponent } from './newhome.component';
import { Routes, RouterModule } from '@angular/router';
import { NewhomeListComponent } from './newhome-list/newhome-list.component';

const routes: Routes = [
	{
		path: '',
		component: NewhomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [NewhomeComponent, NewhomeListComponent]
})
export class NewhomeModule {}
