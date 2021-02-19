import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {LoginResponse} from '../../../models/loginResponse';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from '../../../services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasLoginError = false;
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(new User(this.username, this.password))
      .subscribe((data: LoginResponse) => {
        if (data === null) {
          this.hasLoginError = true;
        }
        else {
          this.tokenStorageService.saveTokenType(data.tokenType);
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUsername(data.username);

          this.router.navigateByUrl('home');
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.hasLoginError = true;
      });
  }
}
