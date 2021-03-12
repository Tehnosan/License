import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {Like} from '../../models/like';
import {HttpErrorResponse} from '@angular/common/http';
import {Cook} from '../../models/cook';
import {Router} from '@angular/router';

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
  cooks: boolean[] = [];

  showEntireRecipe: boolean[] = [];

  areLikesLoaded = false;
  areCooksLoaded = false;

  currentUrl: string;

  constructor(private recipeService: RecipeService, private router: Router) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    // for offline use
    // this.likedRecipes.push(1);
    // this.likedRecipes.push(5);
    // this.setLikes();

    // this.recipes.push({ id: 1, user: 'Sandrino', name: 'Recipe1', url: 'assets/car.jpg',
    //   steps: 'step1-step2-step3', quantities: 'q1-q2', ingredients: 'ingredient1-ingredient2' });
    // this.recipes.push({ id: 2, user: 'Sandrino', name: 'Recipe2', url: 'assets/car.jpg',
    //   steps: 'step', quantities: 'quantity', ingredients: 'ingredient' });
    // this.recipes.push({ id: 3, user: 'admin', name: 'Recipe3', url: 'assets/car.jpg',
    //   steps: 'Se incalzeste cuptorul la 180g-Se baga in cuptor', quantities: '3 buc-250 ml-350 g', ingredients: 'oua-lapte-faina' });
    // this.recipes.push({ id: 4, user: 'Sandrino', name: 'Recipe4', url: 'assets/car.jpg',
    //   steps: 'step1-step2', quantities: 'q1-q2-q3', ingredients: 'ingredient1-ingredient2-ingredient3' });
    // this.recipes.push({ id: 5, user: 'Sandrino', name: 'Recipe5', url: 'assets/car.jpg',
    //   steps: 'step', quantities: 'quantity', ingredients: 'ingredient' });
    //
    // this.areLikesLoaded = true;
    // this.areCooksLoaded = true;
  }

  // runs on every change of this.recipes
  ngOnChanges(changes: SimpleChanges): void {
    // if this.recipes are loaded ids can be loaded from server
    if (this.recipes.length > 0) {
      // initially all recipes are restricted
      this.showEntireRecipe = Array(this.recipes.length).fill(false);

      this.getIdsOfRecipesLiked();
      this.getIdsOfCookedRecipes();
    }
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
    if (this.cooks[index] === false) {
      console.log('cooked');
      this.cooks[index] = true;
      this.recipeService.cookRecipe(recipeId).subscribe((cook: Cook) => {
        console.log(cook);
      });
    } else {
      console.log('uncooked');
      this.cooks[index] = false;
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

    this.areLikesLoaded = true;
  }

  // get ids for cooked recipes and set cooked array
  getIdsOfCookedRecipes(): void {
    this.recipeService.getIdsOfRecipesCookedBy().subscribe(
      (data: number[]) => {
        this.idsOfCookedRecipes = data;
        this.setCooked();
      }, (httpErrorResponse: HttpErrorResponse) => {
      console.log(httpErrorResponse);
    });
  }

  // populate the boolean array cooked with true if recipe on that position is cooked or false otherwise
  setCooked(): void {
    this.cooks = [];

    for (const recipe of this.recipes) {
      if (this.idsOfCookedRecipes.includes(recipe.id)) {
        this.cooks.push(true);
      }
      else {
        this.cooks.push(false);
      }
    }

    this.areCooksLoaded = true;
  }

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

  // delete recipe with recipeId
  onDelete(recipeId: number): void {
    this.recipeService.deleteRecipeWith(recipeId).subscribe(
      (data: boolean) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([this.currentUrl]);
        });
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }

  onUpdate(recipe: Recipe): void {
    console.log(recipe.id);
    this.router.navigate(['/add', { recipe: JSON.stringify(recipe) }], { skipLocationChange: true });
  }
}
