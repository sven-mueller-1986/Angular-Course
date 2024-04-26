import { Injectable } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { Ingredient } from '../../../models/ingredient';
import { Subject } from 'rxjs';
import { RequestService } from '../../../services/request.service';
import { Endpoints } from '../../../constants/endpoints'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipesChange: Subject<Recipe[]> = new Subject();

  constructor(private requestService: RequestService) { }

  public async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.requestService.get<Recipe[]>(Endpoints.Recipe);
    return recipes;
  }

  public async getRecipe(id: string | undefined): Promise<Recipe | undefined> {
    if(!id)
      return undefined;

    const recipe = await this.requestService.get<Recipe>(Endpoints.Recipe, id);

    if(!recipe)
      return undefined;

    return new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients, recipe.id);
  }

  public async createRecipe(name: string, description: string, imagePath: string, ingredients: Ingredient[]): Promise<Recipe> {
    const recipe = new Recipe(
      name,
      description,
      imagePath,
      ingredients
    );

    const createdRecipe = await this.requestService.post<Recipe, Recipe>(Endpoints.Recipe, recipe);

    this.recipesChange.next(await this.getRecipes());
    return createdRecipe;
  }

  public async updateRecipe(id: string, name: string, description: string, imagePath: string, ingredients: Ingredient[]): Promise<boolean> {
    return true;
    // const recipe = new Recipe(
    //   name,
    //   description,
    //   imagePath,
    //   ingredients
    // );

    // const createdRecipe = await this.requestService.post<Recipe, Recipe>(Endpoints.Recipe, recipe);

    // this.recipesChange.next(await this.getRecipes());
    // return createdRecipe;
  }

  public deleteRecipe(id: string) {
    // const existingRecipe = this.recipes.find(r => r.id === id);

    // if(!existingRecipe)
    //   return;

    // const index = this.recipes.indexOf(existingRecipe);
    // this.recipes.splice(index, 1);

    // this.recipesChange.next(this.recipes);
  }
}
