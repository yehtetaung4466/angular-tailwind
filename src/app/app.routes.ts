import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Signup } from './modules/signup/signup';
import { Login } from './modules/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'signup', component: Signup },
      { path: 'login', component: Login },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

