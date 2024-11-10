import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    // { path: '**', redirectTo: '/login', pathMatch: 'full' },
    { path: 'calendar', component: CalendarComponent },

    { path: '**', redirectTo: '/calendar', pathMatch: 'full' }
];
