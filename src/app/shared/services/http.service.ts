import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { User } from 'src/app/authentication/models/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BASE_URL = 'http://localhost:3030/';

  constructor(private httpClient: HttpClient) {}

  makeRequest(method: string, url: string, isAuthenticated = true, body?: any) {
    url = `${this.BASE_URL}${url}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (isAuthenticated) {
      let currentUser: any = localStorage.getItem('currentUser');

      if (currentUser) {
        currentUser = JSON.parse(currentUser) as {
          accessToken: string;
          user: User;
        };
        headers = headers.set('Authorization', currentUser.accessToken);
      } else {
        throw new Error('Missing authentication details');
      }
    }

    return this.httpClient.request(method, url, { body, headers });
  }
}
