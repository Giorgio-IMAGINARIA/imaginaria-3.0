import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about.component';
import { WorksComponent } from './components/works.component';
import { ContactComponent } from './components/contact.component';
import { HomeComponent } from './components/home.component';



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
        path: 'works',
        component: WorksComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
];
export const routing = RouterModule.forRoot(appRoutes);