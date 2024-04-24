import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../../models/ingredient';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingedientChangedSub: Subscription | undefined;

  public ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingedientChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  ngOnDestroy(): void {
    this.ingedientChangedSub?.unsubscribe();
  }
}
