import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'allergies',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Allergies'
					}
				},
				loadChildren: () => import('./modules/petallergy/pages/allergies/allergies.module').then(m => m.AllergiesModule)
			}, 
			{
				path: 'items',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Items'
					}
				},
				loadChildren: () => import('./modules/petitem/pages/items/items.module').then(m => m.ItemsModule)
			}, 
			{
				path: 'food',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Food'
					}
				},
				loadChildren: () => import('./modules/petfood/pages/food/food.module').then(m => m.FoodModule)
			}, 
			{
				path: 'drugs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Drugs'
					}
				},
				loadChildren: () => import('./modules/petdrug/pages/drugs/drugs.module').then(m => m.DrugsModule)
			}, 
			{
				path: 'clinics',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clinics'
					}
				},
				loadChildren: () => import('./modules/petclinic/pages/clinics/clinics.module').then(m => m.ClinicsModule)
			}, 
			{
				path: 'doctors',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Doctors'
					}
				},
				loadChildren: () => import('./modules/petdoctor/pages/doctors/doctors.module').then(m => m.DoctorsModule)
			}, 
			{
				path: 'records',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Records'
					}
				},
				loadChildren: () => import('./modules/petrecord/pages/records/records.module').then(m => m.RecordsModule)
			}, 
			{
				path: 'pets',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Pets'
					}
				},
				loadChildren: () => import('./modules/pet/pages/pets/pets.module').then(m => m.PetsModule)
			}, 
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
