export class LogoutResponseModel {
  constructor(
    public iFrameUrl: string,
    public postLogoutRedirectUri: string,
    public showSignoutPrompt: boolean
  ) {}
}
