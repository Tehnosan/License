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
  }

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
