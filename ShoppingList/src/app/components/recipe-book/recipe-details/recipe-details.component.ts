import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { ShoppingListService } from '../../shopping/services/shopping-list.service';
import { Ingredient } from '../../../models/ingredient';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  @Input() recipe: Recipe | undefined;

  constructor(private shoppingListService: ShoppingListService){}

  public onAddIngredientsToShoppingList() {
    if(!this.recipe)
      return;

    this.shoppingListService.addIngredients(this.recipe.ingredients)
  }
}
