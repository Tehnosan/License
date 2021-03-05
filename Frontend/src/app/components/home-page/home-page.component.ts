import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    // this.getRecipes();
    this.recipes.push({ id: 1, user: 'Sandrino', name: 'Recipe1', url: 'assets/car.jpg',
      steps: 'step1-step2-step3', quantities: 'q1-q2', ingredients: 'ingredient1-ingredient2' });
    this.recipes.push({ id: 2, user: 'Sandrino', name: 'Recipe2', url: 'assets/car.jpg',
      steps: 'step', quantities: 'quantity', ingredients: 'ingredient' });
    this.recipes.push({ id: 3, user: 'admin', name: 'Recipe3', url: 'assets/car.jpg',
      steps: 'Se incalzeste cuptorul la 180g-Se baga in cuptor', quantities: '3 buc-250 ml-350 g', ingredients: 'oua-lapte-faina' });
    this.recipes.push({ id: 4, user: 'Sandrino', name: 'Recipe4', url: 'assets/car.jpg',
      steps: 'step1-step2', quantities: 'q1-q2-q3', ingredients: 'ingredient1-ingredient2-ingredient3' });
    this.recipes.push({ id: 5, user: 'Sandrino', name: 'Recipe5', url: 'assets/car.jpg',
      steps: 'step', quantities: 'quantity', ingredients: 'ingredient' });
  }

  getRecipes(): void {
    this.recipeService.getHomeRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          // this.router.navigateByUrl('/login');
        });
  }

  handleAddButton(): void {
    this.router.navigateByUrl('/add');
  }
}
