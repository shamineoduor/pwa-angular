import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      emailAddress: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  loginUser() {
    console.log("Form:::", this.loginFormGroup.value);
  }
}
