import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasLoginError = false;
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(res => {
        if (res === null) {
          this.hasLoginError = true;
        }
        else {
          this.router.navigateByUrl('/main');
        }
      });
  }

  test(): void {
    this.authService.test().subscribe( res => {
      console.log(res);
    });
  }
}
