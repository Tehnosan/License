import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  recipes: Recipe[] = [];
  nrOfPosts: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();

    // for offline use
    // this.recipes.push({ id: 1, user: 'Sandrino', name: 'Recipe1', url: 'assets/car.jpg',
    //   steps: 'step1-step2-step3', quantities: 'q1-q2', ingredients: 'ingredient1-ingredient2' });
    // this.recipes.push({ id: 2, user: 'Sandrino', name: 'Recipe2', url: 'assets/car.jpg',
    //   steps: 'step', quantities: 'quantity', ingredients: 'ingredient' });
    // this.recipes.push({ id: 3, user: 'Sandrino', name: 'Recipe3', url: 'assets/car.jpg',
    //   steps: 'Se incalzeste cuptorul la 180g-Se baga in cuptor', quantities: '3 buc-250 ml-350 g', ingredients: 'oua-lapte-faina' });
    // this.nrOfPosts = this.recipes.length;
  }

  // get recipes posted by the current user
  getRecipes(): void {
    this.recipeService.getProfileRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.nrOfPosts = recipes.length;
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          // this.router.navigateByUrl('/login');
        });
  }
}
