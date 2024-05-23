import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalRequest } from '../models/modal-request.model';
import { ModalResponse } from '../models/modal-response.model';
import { DialogTypes } from '../enums/dialog-types.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class AlertComponent implements OnInit {
  @Input() request?: ModalRequest;
  @Output() response: EventEmitter<ModalResponse> = new EventEmitter();

  public type: DialogTypes = DialogTypes.Alert;
  public message: string = '';

  public showOk: boolean = false;
  public showCancel: boolean = false;
  public showClose: boolean = false;

  public isDelete: boolean = false;

 constructor() {}

  public ngOnInit(): void {
    if(!this.request)
      throw new Error("A Modal Request needs to be preovided.")

    this.type = this.request.type;
    this.message = this.message;

    this.configureModal();
  }

  public onSuccess() {
    this.response.emit(new ModalResponse(true));
  }

  public onClose() {
    this.response.emit(new ModalResponse(true));
  }

  public onCancel() {
    this.response.emit(new ModalResponse(false));
  }

  private configureModal() {
    switch(this.type) {
      case DialogTypes.Alert:
        this.showClose = true;
        break;

      case DialogTypes.DeleteDialog:
        this.showOk = true;
        this.showCancel = true;
        this.isDelete = true;
        break;
    }
  }
}
