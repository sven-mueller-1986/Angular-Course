import { Ingredient } from "./ingredient";

export class Recipe {
  constructor(
    public name:string,
    public description:string|undefined,
    public imagePath: string|undefined,
    public ingredients: Ingredient[] = [],
    public id?: string
  ) { }
}
