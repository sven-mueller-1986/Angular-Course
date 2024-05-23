export class UserModel {
  constructor(
    public isAuthenticated: boolean,
    public mail?: string,
    public firstName?: string,
    public lastName?: string,
  ) {}
}
