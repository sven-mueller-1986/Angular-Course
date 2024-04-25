import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../models/ingredient';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm?: NgForm;

  private subscription?: Subscription;

  public newMode: boolean = true;
  public ingredient?: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.newMode = false;
        this.ingredient = this.shoppingListService.getIngredient(id);
        this.ingredientForm?.setValue({
          name: this.ingredient?.name,
          amount: this.ingredient?.amount,
          unit: this.ingredient?.unit
        });
      }
    );
  }

  onAddIngredient(form: NgForm) {
    if(form.invalid)
      return;

    const values = form.value;
    if(this.newMode)
      this.shoppingListService.addIngredient(values.name, values.amount, values.unit);
    else if(this.ingredient && this.ingredient.id){
      try{
        this.shoppingListService.updateIngredient(values.name, values.amount, values.unit, this.ingredient.id);
      }
      catch(e){

      }
    }

    this.clearInputs(form);
  }

  onDeleteIngredient(form: NgForm) {
    if(this.ingredient && this.ingredient.id)
      this.shoppingListService.deleteIngredient(this.ingredient.id);

    this.clearInputs(form);
  }

  clearInputs(form: NgForm) {
    form.reset();
    this.newMode = true;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
