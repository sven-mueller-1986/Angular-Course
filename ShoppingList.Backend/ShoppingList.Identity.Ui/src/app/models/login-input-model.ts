export class LoginInputModel {
  constructor(
    public userName: string,
    public password: string,
    public returnUrl?: string,
    public isPersistent: boolean = false
  ) {}
}
