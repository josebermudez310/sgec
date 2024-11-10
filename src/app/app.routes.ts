import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RegisterComponent } from './components/user/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
