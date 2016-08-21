import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HomeComponent } from './home.component';



const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    },
];
export const routing = RouterModule.forRoot(appRoutes);