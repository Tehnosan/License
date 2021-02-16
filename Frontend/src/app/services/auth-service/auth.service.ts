import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/login`, {username, password});
  }

  test(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYxMzQwOTIxOCwiZXhwIjoxNjEzNDk1NjE4fQ.rEaCFBb5jhroNty7ajLo8ioCYhTlqDSTBl5oWyw0lKattxlWGy2vghfg8u207MOmqz6Ie0ITXR7G94wuaRBPFw');

    return this.http.get(`${this.backendUrl}/logged/user`, {headers});
  }
}
