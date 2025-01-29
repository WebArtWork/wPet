import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PetstoreComponent } from './petstore.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';

const routes: Routes = [
	{
		path: '',
		component: PetstoreComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PetstoreComponent, StoreListComponent]
})
export class PetstoreModule {}
