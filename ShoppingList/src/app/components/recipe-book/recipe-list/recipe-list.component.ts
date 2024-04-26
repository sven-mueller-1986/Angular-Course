import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  public recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
    this.subscription = this.recipeService.recipesChange.subscribe((recipes: Recipe[]) => this.recipes = recipes)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
