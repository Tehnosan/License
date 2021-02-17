import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  // return true if user is logged in or false if user is not logged in
  isAuthenticated(): boolean {
    // get the auth token from localStorage
    const token = localStorage.getItem('accessToken');

    // check if token is set, then...
    return !!token;
  }

  // if user is logged in is permitted acces to page else access is restricted
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      if (this.isAuthenticated()) {
        return resolve(true);
      }

      this.router.navigateByUrl('/login');
      return resolve(false);
    });
  }
}
