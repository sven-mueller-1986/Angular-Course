import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../../models/recipe';
import { ShoppingListService } from '../../shopping/services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {

  public recipe: Recipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    );
  }

  public onAddIngredientsToShoppingList() {
    if(!this.recipe)
      return;

    this.shoppingListService.addIngredients(this.recipe.ingredients)
  }

  public onEditClicked() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
