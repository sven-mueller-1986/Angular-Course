import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-wrapper',
  templateUrl: './recipe-wrapper.component.html',
  styleUrl: './recipe-wrapper.component.scss'
})
export class RecipeWrapperComponent implements OnInit {
  public selectedRecipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => this.selectedRecipe = recipe
    );
  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
