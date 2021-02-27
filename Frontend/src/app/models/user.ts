export class User {
  username: string;
  password: string;


  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class AuthUser extends User{
  firstName: string;
  lastName: string;
  imageUrl: string;

  constructor(username: string, password: string, firstName: string, lastName: string, imageUrl: string) {
    super(username, password);
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
  }
}
