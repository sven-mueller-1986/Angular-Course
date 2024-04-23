import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe | undefined;
  @Input() isActive: boolean = false;

  constructor(private recipeService: RecipeService) {}

  onRecipeClicked() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
