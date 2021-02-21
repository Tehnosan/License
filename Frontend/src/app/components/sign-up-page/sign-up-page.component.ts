import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {AuthUser} from '../../models/user';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  hasSignupError = false;
  errorText: string;

  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(): void {
    this.authService.signup(new AuthUser(this.username, this.password, this.firstName, this.lastName))
      .subscribe(data => {
        if (data === null) {
          this.hasSignupError = true;
          this.errorText = 'Authentication error';
        }
        else {
          console.log(data);

          this.router.navigateByUrl('login');
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.hasSignupError = true;
        this.errorText = httpErrorResponse.error.message;
      });
  }
}
