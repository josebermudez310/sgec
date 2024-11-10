import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { GraphicComponent } from './graphic/graphic.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'configurations', component: ConfigurationsComponent },
            { path: 'graphic', component: GraphicComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];
