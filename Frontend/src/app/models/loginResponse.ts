export class LoginResponse {
  username: string;
  tokenType: string;
  accessToken: string;
  imageUrl: string;

  constructor(username: string, tokenType: string, accessToken: string, imageUrl: string) {
    this.username = username;
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.imageUrl = imageUrl;
  }
}
