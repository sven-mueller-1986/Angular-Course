import { Component } from '@angular/core';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  public recipes: Recipe[] = [
    new Recipe("Test Recipe", "This is simply a test.", "https://media.news.com.au/nnd/T3Interactives/taste/20141006/recipecard_3/images/recipe1.jpg"),
    new Recipe("Test Recipe", "This is simply a test.", "https://media.news.com.au/nnd/T3Interactives/taste/20141006/recipecard_3/images/recipe1.jpg"),
    new Recipe("Test Recipe", "This is simply a test.", "https://media.news.com.au/nnd/T3Interactives/taste/20141006/recipecard_3/images/recipe1.jpg")
  ];
}
