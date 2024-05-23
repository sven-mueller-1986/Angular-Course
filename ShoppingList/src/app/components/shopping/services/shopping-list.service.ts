import { Injectable } from '@angular/core';
import { Ingredient } from '../../core/models/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredients: Ingredient[] = [
    new Ingredient("Meat", 3, "kg", 1),
    new Ingredient("Onion", 1, "Piece(s)", 2)
  ];

  constructor() { }

  public ingredientsChanged: Subject<Ingredient[]> = new Subject();
  public startedEditing: Subject<number> = new Subject();

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public getIngredient(id: number): Ingredient | undefined {
    const ingredient = this.ingredients.find(i => i.id === id);

    if(!ingredient)
      return undefined

    return new Ingredient(ingredient.name, ingredient.amount, ingredient.unit, ingredient.id);
  }

  public addIngredient(name: string, amount: number, unit: string, emitEvent: boolean = true) {
    const existingIngredient = this.ingredients.find(i => i.name === name);

    if(existingIngredient)
      existingIngredient.amount += amount;
    else
      this.ingredients.push(new Ingredient(name, amount, unit, this.ingredients.length + 1));

    if(emitEvent)
      this.ingredientsChanged.next(this.getIngredients());
  }

  public updateIngredient(name: string, amount: number, unit: string, id: number) {
    const existingIngredientById = this.ingredients.find(i => i.id === id);
    if(!existingIngredientById)
      return;

    const existingIngredientByName = this.ingredients.find(i => i.name === name && i.id !== id);
    if(existingIngredientByName)
      throw new Error("Ingredient with this name already exists.");

    existingIngredientById.name = name;
    existingIngredientById.amount = amount;
    existingIngredientById.unit = unit;

    this.ingredientsChanged.next(this.getIngredients());
  }

  public addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(
      (ingredient: Ingredient) => this.addIngredient(ingredient.name, ingredient.amount, ingredient.unit, false)
    );

    this.ingredientsChanged.next(this.getIngredients());
  }

  public deleteIngredient(id: number) {
    const existingIngredient = this.ingredients.find(i => i.id === id);
    if(!existingIngredient)
      return;

    this.ingredients.splice(this.ingredients.indexOf(existingIngredient), 1)
    this.ingredientsChanged.next(this.getIngredients());
  }
}
