import { Component } from '@angular/core';
import { Ingredient } from '../../../models/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  public ingredients: Ingredient[] = [
    new Ingredient("Meat", 3, "kg"),
    new Ingredient("Onion", 1, "Piece(s)")
  ];
}
