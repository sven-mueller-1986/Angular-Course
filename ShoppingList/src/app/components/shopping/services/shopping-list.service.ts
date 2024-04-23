import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../../../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredients: Ingredient[] = [
    new Ingredient("Meat", 3, "kg"),
    new Ingredient("Onion", 1, "Piece(s)")
  ];

  constructor() { }

  public ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter();

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(name: string, amount: number, unit: string, emitEvent: boolean = true) {
    const existingIngredient = this.ingredients.find(i => i.name === name);

    if(existingIngredient)
      existingIngredient.amount += amount;
    else
      this.ingredients.push(new Ingredient(name, amount, unit));

    if(emitEvent)
      this.ingredientsChanged.emit(this.getIngredients());
  }

  public addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(
      (ingredient: Ingredient) => this.addIngredient(ingredient.name, ingredient.amount, ingredient.unit, false)
    );

    this.ingredientsChanged.emit(this.getIngredients());
  }
}