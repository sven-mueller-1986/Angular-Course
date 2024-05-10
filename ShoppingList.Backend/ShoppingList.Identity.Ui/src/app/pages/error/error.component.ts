import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorModel } from '../../models/error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  public errorMessage?: ErrorModel;

  constructor(private requestService: RequestService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.errorMessage = await this.requestService.get<ErrorModel>(`error?errorId=${this.route.snapshot.queryParams["errorId"]}`)
  }
}
