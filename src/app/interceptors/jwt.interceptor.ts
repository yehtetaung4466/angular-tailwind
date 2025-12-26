// // jwt.interceptor.ts
// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import {
//   catchError, switchMap, filter, take, retry
// } from 'rxjs/operators';
// import { BehaviorSubject, throwError } from 'rxjs';

// let isRefreshing = false;
// const refreshTokenSubject = new BehaviorSubject<string | null>(null);

// export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
//   const auth = inject(AuthService);
//   const token = auth.getAccessToken();
//   const authReq = token ? req.clone({
//     setHeaders: { Authorization: `Bearer ${token}` }
//   }) : req;




//   return next(authReq).pipe(
//     retry(3),
//     catchError(err => {
//       if (err.status === 401) {
//         if (!isRefreshing) {
//           isRefreshing = true;
//           refreshTokenSubject.next(null);
//           return auth.refreshToken().pipe(
//             switchMap(tokens => {
//               isRefreshing = false;
//               refreshTokenSubject.next(tokens.accessToken);
//               return next(authReq.clone({
//                 setHeaders: { Authorization: `Bearer ${tokens.accessToken}` }
//               }));
//             }),
//             catchError(error => {
//               isRefreshing = false;
//               auth.logout();
//               return throwError(() => error);
//             })
//           );
//         } else {
//           return refreshTokenSubject.pipe(
//             filter(token => token !== null),
//             take(1),
//             switchMap(token => {
//               return next(authReq.clone({
//                 setHeaders: { Authorization: `Bearer ${token}` }
//               }));
//             })
//           );
//         }
//       }

//       return throwError(() => err);
//     })
//   );
// };
