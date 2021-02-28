import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {AuthUser} from '../../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  hasSignUpError = false;

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get firstName(): string { return this.signUpForm.get('firstName').value; }
  get lastName(): string { return this.signUpForm.get('lastName').value; }
  get username(): string { return this.signUpForm.get('username').value; }
  get password(): string { return this.signUpForm.get('password').value; }

  signup(): void {
    this.authService.signup(new AuthUser(this.username, this.password, this.firstName, this.lastName, ''))
      .subscribe(data => {
        if (data === null) {
          console.log('nul');
          this.hasSignUpError = true;
        }
        else {
          console.log(data);

          this.router.navigateByUrl('login');
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.hasSignUpError = true;
      });
  }
}
