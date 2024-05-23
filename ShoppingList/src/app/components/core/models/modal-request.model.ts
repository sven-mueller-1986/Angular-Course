import { DialogTypes } from "../enums/dialog-types.enum";

export class ModalRequest {
  constructor(
    public type: DialogTypes,
    public message: string
  ) {}
}
