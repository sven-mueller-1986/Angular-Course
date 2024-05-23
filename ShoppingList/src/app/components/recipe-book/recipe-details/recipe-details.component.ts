import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../core/models/recipe';
import { ShoppingListService } from '../../shopping/services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  public recipe?: Recipe;

  public isLoading: boolean = true;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private modal: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  public ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.isLoading = true;
        this.recipeService.getRecipe(params['id']).then(recipe =>{
          this.recipe = recipe;
          this.isLoading = false;
        });
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

  public async onDeleteClicked() {
    const confirmation = await this.modal.showDeleteDialogAsync("Do You really want to delete this item?");
    if(!confirmation) return;

    if(this.recipe && this.recipe.id)
      this.recipeService.deleteRecipe(this.recipe.id);

    this.router.navigate(['/recipe']);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
