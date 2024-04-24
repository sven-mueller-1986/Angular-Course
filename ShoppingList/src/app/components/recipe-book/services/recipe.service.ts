import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { Ingredient } from '../../../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(1,
      "Barbacoa-Spiced Easter Lamb",
      "For this barbacoa-spiced Easter lamb, we’re using the flavors of Central Mexican barbacoa, but not the traditional cooking method. This lamb will taste incredible sliced on a plate, and the leftovers make great tacos. And by the way, this method—slow, moist roasting—gives you melt-in-your-mouth tender, juicy, flavorful lamb leg roast, no matter what seasonings you use.",
      "https://www.allrecipes.com/thmb/dS5uYyXtS9OiivJ0Q0Mv5RxLxN0=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8604271_Barbacoa-Spiced-Easter-Lamb_John-Mitzewich_4x3-a2dd943ea2b84da38683399272e1b174.jpg",
      [
        new Ingredient("lamb roast", 6, "pound"),
        new Ingredient("kosher salt", 2, "tablespoon(s)"),
        new Ingredient("lemon", 1, "piece"),
      ]),

    new Recipe(2,
      "Bob's Pulled Pork on a Smoker",
      "This smoked pulled pork recipe is the correct way to smoke a pork shoulder with professional results — from the cider brine and sugar rub to the rave reviews you will receive. Smoke is the key to breaking down the fat, which adds flavor and moisture to the meat. Place in a bun with your favorite BBQ sauce.",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1198969.jpg&q=60&c=sc&poi=auto&orient=true&h=512",
      [
        new Ingredient("pork shoulder roast", 8, "pound"),
        new Ingredient("white sugar", 5, "tablespoon(s)"),
        new Ingredient("onion", 1, "piece"),
      ]),

    new Recipe(3,
      "Beef Wellington",
      "This beef Wellington recipe includes a rich red wine sauce. It's easier than you think to make and absolutely perfect for entertaining at Christmas or any time you want to impress your guests! The beef tenderloin is best served medium-rare.",
      "https://www.allrecipes.com/thmb/3xW1g-TshPTPCzKqCPPgt2unCUw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/16899-beef-wellington-DDMFS-4x3-84b7691972174478bfb16b465cdaf0d2.jpg",
      [
        new Ingredient("pounds beef tenderloin", 2.5, "pound"),
        new Ingredient("red wine", 2, "tablespoon(s)"),
        new Ingredient("egg", 1, "piece"),
      ])
  ];

  constructor() { }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  public addRecipe(recipe: Recipe) {

  }
}
