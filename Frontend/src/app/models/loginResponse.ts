export class LoginResponse {
  username: string;
  tokenType: string;
  accessToken: string;


  constructor(username: string, tokenType: string, accessToken: string) {
    this.username = username;
    this.tokenType = tokenType;
    this.accessToken = accessToken;
  }
}
