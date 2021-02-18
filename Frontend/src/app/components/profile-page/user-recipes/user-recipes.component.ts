import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          // this.router.navigateByUrl('/login');
        });
  }

  onHeartClick(event): void {
    if (event.target.classList.contains('red')) {
      event.target.classList.remove('red');
    }
    else {
      event.target.classList.add('red');
    }
  }
}
