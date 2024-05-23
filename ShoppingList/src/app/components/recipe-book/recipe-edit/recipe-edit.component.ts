import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../../core/models/ingredient';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit{

  private amountRegex = /^[1-9]+[0-9]*$/;

  public id?: string;
  public newMode: boolean = true;
  public isLoading: boolean = true;

  public recipeForm: FormGroup = new FormGroup({});

  constructor(private recipeService: RecipeService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      async (params: Params) => {
        this.isLoading = true;
        this.id = params['id'];
        this.newMode = this.id === undefined;
        await this.initForm();
        this.isLoading = false;
      }
    );
  }

  public async onSubmit() {
    const values = this.recipeForm.value;
    if(this.newMode) {
      const newRecipe = await this.recipeService.createRecipe(values.name, values.description, values.imagePath, values.ingredients);
      this.id = newRecipe.id;
    }
    else if(this.id) {
      this.recipeService.updateRecipe(this.id, values.name, values.description, values.imagePath, values.ingredients);
    }

    this.router.navigate(["/recipe", this.id]);
  }

  public onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  public onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
    this.fb.group({
      "name": this.fb.control(null, Validators.required),
      "amount": this.fb.control(null, [Validators.required, Validators.pattern(this.amountRegex)]),
      "unit": this.fb.control(null, Validators.required)
    }));
  }

  public isControlInvalid(name: string): boolean {
    const control = this.recipeForm.get(name) as FormControl;

    if(!control)
      return false;

    return control.invalid && control.touched;
  }

  public isIngredientControlInvalid(index: number, name: string): boolean {
    const control = this.ingredientControls.at(index)?.get(name) as FormControl;
    return control.invalid && control.touched;
  }

  public onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  private async initForm() {
      const recipe = await this.recipeService.getRecipe(this.id);
      const recipeName = recipe?.name ?? "";
      const recipeImagePath = recipe?.imagePath ?? "";
      const recipeDescription = recipe?.description ?? "";
      const recipeIngredients = this.fb.array<FormGroup>([]);

      if(!this.newMode && recipe) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(this.fb.group({
            "name": this.fb.control(ingredient.name, Validators.required),
          "amount": this.fb.control(ingredient.amount, [Validators.required, Validators.pattern(this.amountRegex)]),
            "unit": this.fb.control(ingredient.unit, Validators.required)
          }));
        });
      }

    this.recipeForm = new FormGroup({
      "name": this.fb.control(recipeName, Validators.required),
      "imagePath": this.fb.control(recipeImagePath, Validators.required),
      "description": this.fb.control(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });
  }
}
