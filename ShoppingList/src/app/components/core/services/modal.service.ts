import { Injectable, ViewContainerRef } from '@angular/core';
import { AlertComponent } from '../alert/modal.component';
import { ModalRequest } from '../models/modal-request.model';
import { firstValueFrom } from 'rxjs';
import { DialogTypes } from '../enums/dialog-types.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private alertContainer?: ViewContainerRef;

  constructor() { }

  public resgisterAlertContainer(container: ViewContainerRef) {
    console.log("container:", container);
    this.alertContainer = container;
  }

  public async showAlert(message: string) {
    if(!this.alertContainer)
      throw new Error("No Alert Container set. Call resgisterAlertContainer first.");

    const alertRef = this.alertContainer.createComponent(AlertComponent);
    alertRef.instance.request = new ModalRequest(DialogTypes.Alert, message);
    const response = await firstValueFrom(alertRef.instance.response);

    this.alertContainer.clear();

    return response.consent;
  }

  public async showDeleteDialogAsync(message: string) : Promise<boolean> {
    if(!this.alertContainer)
      throw new Error("No Alert Container set. Call resgisterAlertContainer first.");

    const dialogRef = this.alertContainer.createComponent(AlertComponent);
    dialogRef.instance.request = new ModalRequest(DialogTypes.DeleteDialog, message);
    const response = await firstValueFrom(dialogRef.instance.response);

    this.alertContainer.clear();

    return response.consent;
  }
}
