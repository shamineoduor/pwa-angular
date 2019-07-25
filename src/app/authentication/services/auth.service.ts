import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { User } from '../models/user';
import { HttpService } from 'src/app/shared/services/http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  REGISTRATION_ENDPOINT = 'users';
  LOGIN_ENDPOINT = 'authentication';

  userSubject = new Subject<User>();

  constructor(private http: HttpService) {}

  isAuthenticated() {
    const currentUser = localStorage.getItem('currentUser');

    return !!currentUser;
  }

  addUser(user: User) {
    return this.http
      .makeRequest('POST', this.REGISTRATION_ENDPOINT, false, user)
      .pipe(map((newUser: User) => newUser));
  }

  getCurrentUser(): { accessToken: string; user: User } {
    let user: any = localStorage.getItem('currentUser');

    if (!!user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }

    return user;
  }

  login(creds: { emailAddress: string; password: string }) {
    return this.http
      .makeRequest('POST', this.LOGIN_ENDPOINT, false, {
        ...creds,
        strategy: 'local',
      } as any)
      .pipe(
        map((response: { accessToken: string; user: User }) => {
          if (response) {
            localStorage.setItem('currentUser', JSON.stringify(response));

            this.userSubject.next(response.user);
            return true;
          }

          return false;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');

    this.userSubject.next(null);
  }
}
