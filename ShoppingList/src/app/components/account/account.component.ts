import { Component, OnInit } from '@angular/core';
import { UserModel } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {

  public user?: UserModel;

  constructor(private authService: AuthService) { }

  public async ngOnInit(): Promise<void> {
    this.authService.User().then(user => this.user = user);
  }
}
