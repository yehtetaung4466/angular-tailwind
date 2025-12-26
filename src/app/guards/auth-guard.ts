import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { error } from 'better-auth/api';

export const authGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log({ auth: authService.authenticated().user });


  console.log({ auth: !!authService.authenticated().user });


  if (!authService.authenticated().user) {
    console.log("no user");

    authService.fetchSession().subscribe(
      {


        error: (() => router.navigate(['/auth/login']))
        ,
        next: (res => {
          console.log({ res });

          if (!res.data) {
            console.log('here');

            router.navigate(['/auth/login']);
          }
        })
      },

    );
  }

  return authService.authenticated() ? true : router.parseUrl('/login');
};
