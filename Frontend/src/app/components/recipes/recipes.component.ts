import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {Like} from '../../models/like';
import {HttpErrorResponse} from '@angular/common/http';
import {Cook} from '../../models/cook';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnChanges {
  @Input() recipes: Recipe[];
  likes: boolean[] = [];
  idsOfLikedRecipes: number[] = [];

  idsOfCookedRecipes: number[] = [];
  cooked: boolean[] = [];

  showEntireRecipe: boolean[] = Array(5).fill(false);

  constructor(private recipeService: RecipeService) {
  }

  // populate likes array with false
  ngOnInit(): void {
    this.getIdsOfRecipesLiked();
    this.likes = Array(5).fill(false);

    // this.getIdsOfCookedRecipes();
    this.cooked = Array(5).fill(false);

    // for offline use
    // this.likedRecipes.push(1);
    // this.likedRecipes.push(5);
    // this.setLikes();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  // like or unlike recipe with recipeId
  onHeartClick(index: number, recipeId: number): void {
    // this.likes[index] = this.likes[index] !== true;

    if (this.likes[index] === false) {
      console.log('like');
      this.likes[index] = true;
      this.recipeService.likeRecipe(recipeId).subscribe((like: Like) => {
        console.log(like);
      });
    } else {
      console.log('unlike');
      this.likes[index] = false;
      this.recipeService.unlikeRecipe(recipeId).subscribe((like: Like) => {
        console.log(like);
      });
    }
  }

  // mark recipe as cooked or uncooked
  onCookClick(index: number, recipeId: number): void {
    if (this.cooked[index] === false) {
      console.log('cooked');
      this.cooked[index] = true;
      this.recipeService.cookRecipe(recipeId).subscribe((cook: Cook) => {
        console.log(cook);
      });
    } else {
      console.log('uncooked');
      this.cooked[index] = false;
      this.recipeService.uncookedRecipe(recipeId).subscribe((cook: Cook) => {
        console.log(cook);
      });
    }
  }

  // get ids for liked recipes and set likes array
  getIdsOfRecipesLiked(): void {
    this.recipeService.getIdsOfRecipesLikedBy().subscribe(
      (data: number[]) => {
        this.idsOfLikedRecipes = data;
        this.setLikes();
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }

  // populate the boolean array likes with true if recipe it's liked or false otherwise
  setLikes(): void {
    this.likes = [];

    for (const recipe of this.recipes) {
      if (this.idsOfLikedRecipes.includes(recipe.id)) {
        this.likes.push(true);
      } else {
        this.likes.push(false);
      }
    }
  }

  // get ids for cooked recipes and set cooked array
  // getIdsOfCookedRecipes(): void {
  //
  // }

  // populate the boolean array cooked with true if recipe on that position is cooked or false otherwise
  // setCooked(): void {
  //
  // }

  showFullRecipe(i: number): void {
    console.log('full recipe');
    this.showEntireRecipe[i] = !this.showEntireRecipe[i];
  }

  // return propertyList string splitted by '-'
  stringToArray(propertyList: string): string[] {
    return propertyList.split('-');
  }

  // return a matrix with the elements of two interspersed lists
  ingredientsAndQuantities(ingredients: string, quantities: string): string[][] {
    const quantitiesAsArray = this.stringToArray(quantities);
    return this.stringToArray(ingredients).map((x, i) => [x, quantitiesAsArray[i]]);
  }
}
