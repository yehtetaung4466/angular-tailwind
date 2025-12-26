import { computed, Injectable, signal } from '@angular/core';
import { createAuthClient, Session, User } from 'better-auth/client';
import { environment } from '../../environments/environment.development';
import { defer, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = createAuthClient({
    baseURL: environment.apiUrl,
  });

  private session = signal<Session | null | undefined>(null);
  private user = signal<User | null | undefined>(null);

  readonly authenticated = computed(() => ({
    session: this.session(),
    user: this.user(),
  }));

  constructor() {
    this.fetchSession().subscribe({
      error: () => {
        this.session.set(null);
        this.user.set(null);
      },
    });
  }

  fetchSession() {
    return defer(() => this.auth.getSession()).pipe(
      map(res => {
        if (res.error) throw res.error;
        return res;
      }),
      tap(({ data }) => {
        this.session.set(data?.session);
        this.user.set(data?.user);
      })
    );
  }

  signIn(email: string, password: string) {
    return defer(() =>
      this.auth.signIn.email({ email, password })
    ).pipe(
      map(res => {
        if (res.error) throw res.error;
        return res;
      }),
      tap(async () => {
        const { data, error } = await this.auth.getSession();
        if (error) throw error;

        this.session.set(data?.session);
        this.user.set(data?.user);
      })
    );
  }

  signUp(name: string, email: string, password: string) {
    return defer(() =>
      this.auth.signUp.email({ name, email, password })
    ).pipe(
      map(res => {
        if (res.error) throw res.error;
        return res;
      })
    );
  }

  signOut() {
    return defer(() => this.auth.signOut()).pipe(
      map(res => {
        if (res.error) throw res.error;
        return res;
      }),
      tap(() => {
        this.session.set(null);
        this.user.set(null);
      })
    );
  }
}

