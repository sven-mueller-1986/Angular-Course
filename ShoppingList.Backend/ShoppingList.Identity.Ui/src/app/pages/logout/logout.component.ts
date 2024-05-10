import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { LogoutInputModel } from '../../models/logout-input-model';
import { LogoutResponseModel } from '../../models/logout-response-model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  private timer: any;

  public isLoading: boolean = true;
  public error?: string;
  public response?: LogoutResponseModel;

  public counter: number = 10;

  constructor(private requestService: RequestService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    console.log(this.route.snapshot);
    this.response = await this.requestService.post<LogoutInputModel, LogoutResponseModel>("logout", new LogoutInputModel(
      this.route.snapshot.queryParams["logoutId"]
    ))
    .catch(reason => {
      this.error = reason.message;
      return undefined;
     })
    .finally(() => this.isLoading = false);

    this.startCountdown();
  }

  private redirect() {
    if(this.response?.postLogoutRedirectUri)
      window.location.href = this.response.postLogoutRedirectUri;
  }

  private startCountdown() {
    this.timer = setInterval(() => {
      if(--this.counter === 0) {
        clearInterval(this.timer);
        this.redirect()
      }
    }, 1000);
  }
}
