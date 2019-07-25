import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BASE_URL = 'http://localhost:3030/';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  makeRequest(method: string, url: string, isAuthenticated = true, body?: any) {
    url = `${this.BASE_URL}${url}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (isAuthenticated) {
      const currentUser = this.authService.getCurrentUser();
      headers = headers.set('Authorization', currentUser.accessToken);
    }

    return this.httpClient.request(method, url, { body, headers });
  }
}
