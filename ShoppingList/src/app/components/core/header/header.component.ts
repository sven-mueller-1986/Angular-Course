import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public user?: UserModel;

  public loginUrl: string;
  public logoutUrl: string;

  constructor(private authService: AuthService) {
    this.loginUrl = authService.loginUrl;
    this.logoutUrl = authService.logoutUrl;
  }

  public async ngOnInit(): Promise<void> {
    this.authService.User().then(user => this.user = user);
  }
}
