import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {LoginResponse} from '../../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(user: User): Observable<LoginResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post<LoginResponse>(`${this.backendUrl}/signin`, user, { headers });
  }
}
