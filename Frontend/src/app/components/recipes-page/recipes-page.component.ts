import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/recipe';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {RecipeService} from '../../services/recipe-service/recipe.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: Recipe[];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    // get what type of recipes need
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');

      // get recipes depending on type
      if (type === 'liked') {
        console.log('acum incarc retetele');
        this.getAndSetLikedRecipes();
      }
      // else if (type === 'cooked') {
      //   this.
      // }
    });
  }

  // get and set this.recipes with recipes liked by user
  getAndSetLikedRecipes(): void {
    this.recipeService.getRecipesLikedBy().subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }

  // get and set this.recipes with recipes cokked by user
  // getAndSetCookedRecipes(): void {
  //
  // }
}
