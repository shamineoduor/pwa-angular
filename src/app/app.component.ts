import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/services/auth.service';
import { User } from './authentication/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.userSubject.subscribe(user => {
      this.currentUser = user;
    });

    if (!this.currentUser) {
      const loggedInUser = this.authService.getCurrentUser();

      if (loggedInUser) {
        this.currentUser = loggedInUser.user;
      }
    }
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/auth/login']);
  }
}
