import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Endpoints } from '../constants/endpoints';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user?: UserModel;

  public loginUrl: string = `/api/${Endpoints.Identity}/login?returnUrl=/recipe`;
  public logoutUrl: string = `/api/${Endpoints.Identity}/logout`;

  constructor(private requestService: RequestService) { }

  public async User() {
    if(this.user)
      return this.user;

    this.user = await this.requestService.get<UserModel>(`${Endpoints.Identity}/user`);
    return this.user;
  }
}
