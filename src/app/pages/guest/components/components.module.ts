import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsComponent } from './components.component';
import { Routes, RouterModule } from '@angular/router';
import { FileModule } from 'src/app/core/modules/file/file.module';
import { CollapseModule } from 'src/app/core/modules/collapse/collapse.module';
import { CalendarModule } from 'src/app/core/modules/calendar/calendar.module';
import { FormModule } from 'src/app/core/modules/form/form.module';

const routes: Routes = [
	{
		path: '',
		component: ComponentsComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		FileModule,
		CollapseModule,
		CalendarModule,
		FormModule
	],
	declarations: [ComponentsComponent],
	providers: []
})
export class ComponentsModule {}
