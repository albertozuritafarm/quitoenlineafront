import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { LeadDialerComponent } from './lead-dialer/lead-dialer.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {path: 'logout', component: LogoutComponent,canActivate:[AuthGuard], pathMatch: 'full'},
    {path: 'leads-home', component: LeadDialerComponent,canActivate:[AuthGuard], pathMatch: 'full'},
    {path: 'leads-home/:id', component: LeadDialerComponent,canActivate:[AuthGuard], pathMatch: 'full'},
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];
