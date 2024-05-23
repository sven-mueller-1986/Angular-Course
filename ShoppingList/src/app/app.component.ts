import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ModalService } from './components/core/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  @ViewChild("alertContainer", {read: ViewContainerRef}) alertContainer!: ViewContainerRef;

  constructor(private alertService: ModalService) {}

  public ngAfterViewInit(): void {
    this.alertService.resgisterAlertContainer(this.alertContainer);
  }
 }
