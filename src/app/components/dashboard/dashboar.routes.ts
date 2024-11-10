import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'configurations', component: ConfigurationsComponent },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];
