import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signupFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
  }

  registerUser() {
    const form = this.signupFormGroup.value;

    if (form.password === form.passwordConfirmation) {
      this.authService.addUser(form).subscribe(_ => {
        // take user to the login page
        this.router.navigate(['/auth/login']);
      });
    } else {
      alert('The 2 Passwords do not match');
    }
  }
}
