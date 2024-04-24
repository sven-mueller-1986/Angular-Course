import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit{

  constructor(private route: ActivatedRoute) {}
  public id: number | undefined;
  public newMode: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.newMode = Number.isNaN(this.id);
      }
    )
  }
}
