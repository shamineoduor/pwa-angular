import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new Subject<User>();

  users: User[] = [];

  private persist() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isAuthenticated() {
    const currentUser = localStorage.getItem('currentUser');

    return !!currentUser;
  }

  addUser(user: User) {
    this.users = [user, ...this.users];

    this.persist();
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

  getUsers() {
    const users = localStorage.getItem('users');

    if (users) {
      this.users = JSON.parse(users);
    }
  }

  login(creds: { emailAddress: string; password: string }) {
    const currentUser = this.users.find(
      user =>
        user.email.toLowerCase() === creds.emailAddress.toLowerCase() &&
        user.password === creds.password,
    );

    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      this.userSubject.next(currentUser);
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');

    this.userSubject.next(null);
  }
}
