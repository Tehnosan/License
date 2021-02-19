import { Injectable } from '@angular/core';

const TOKEN_TYPE_KEY = 'tokenType';
const TOKEN_KEY = 'accessToken';
const USERNAME_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveTokenType(tokenType: string): void {
    window.sessionStorage.removeItem(TOKEN_TYPE_KEY);
    window.sessionStorage.setItem(TOKEN_TYPE_KEY, tokenType);
  }

  public getTokenType(): string {
    return sessionStorage.getItem(TOKEN_TYPE_KEY);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}
