export class Recipe {
  public name: string;
  public description: string|undefined;
  public imagePath: string|undefined;

  constructor(name:string, description:string|undefined, imagePath: string|undefined) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
