import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent {

  @ViewChild('name') nameInput: ElementRef | undefined;
  @ViewChild('amount') amountInput: ElementRef | undefined;
  @ViewChild('unit') unitInput: ElementRef | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient() {
    if(!this.nameInput || !this.amountInput || !this.unitInput)
      return;

    this.shoppingListService.addIngredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value, this.unitInput.nativeElement.value);
    this.clearInputs();
  }

  onDeleteIngredient() {

  }

  clearInputs() {
    if(this.nameInput)
      this.nameInput.nativeElement.value = '';

    if(this.amountInput)
      this.amountInput.nativeElement.value = '';

    if(this.unitInput)
      this.unitInput.nativeElement.value = '';
  }
}
