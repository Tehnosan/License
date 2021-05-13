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
  @Input() searchText: string;

  likes: Map<number, boolean>;
  idsOfLikedRecipes: number[] = [];

  idsOfCookedRecipes: number[] = [];
  cooks: Map<number, boolean>;

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

    // this.recipes.push({ id: 1, user: 'Sandrino', name: 'Lava Cake', url: 'assets/car.jpg',
    //   steps: 'step1-step2-step3', quantities: 'q1-q2', ingredients: 'ingredient1-ingredient2' });
    // this.recipes.push({ id: 2, user: 'Sandrino', name: 'Lasagna', url: 'assets/car.jpg',
    //   steps: 'step', quantities: 'quantity', ingredients: 'ingredient' });
    // this.recipes.push({ id: 3, user: 'admin', name: 'Ciorba', url: 'assets/car.jpg',
    //   steps: 'Se incalzeste cuptorul la 180g-Se baga in cuptor', quantities: '3 buc-250 ml-350 g', ingredients: 'oua-lapte-faina' });
    // this.recipes.push({ id: 4, user: 'Sandrino', name: 'Sarmale', url: 'assets/car.jpg',
    //   steps: 'step1-step2', quantities: 'q1-q2-q3', ingredients: 'ingredient1-ingredient2-ingredient3' });
    // this.recipes.push({ id: 5, user: 'Sandrino', name: 'Raclette', url: 'assets/car.jpg',
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
  onHeartClick(recipeId: number): void {
    if (this.likes.get(recipeId) === false) {
      console.log('like');
      this.recipeService.likeRecipe(recipeId).subscribe((like: Like) => {
        console.log(like);
        if (like) {
          this.likes.set(recipeId, true);
        }
      });
    } else {
      console.log('unlike');
      this.recipeService.unlikeRecipe(recipeId).subscribe((like: Like) => {
        console.log(like);
        if (like) {
          this.likes.set(recipeId, false);
        }
      });
    }
  }

  // mark recipe as cooked or uncooked
  onCookClick(recipeId: number): void {
    if (this.cooks.get(recipeId) === false) {
      console.log('cooked');
      this.cooks.set(recipeId, true);
      this.recipeService.cookRecipe(recipeId).subscribe((cook: Cook) => {
        console.log(cook);
      });
    } else {
      console.log('uncooked');
      this.cooks.set(recipeId, false);
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
    this.likes = new Map<number, boolean>();

    for (const recipe of this.recipes) {
      if (this.idsOfLikedRecipes.includes(recipe.id)) {
        this.likes.set(recipe.id, true);
      }
      else {
        this.likes.set(recipe.id, false);
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
    this.cooks = new Map<number, boolean>();

    for (const recipe of this.recipes) {
      if (this.idsOfCookedRecipes.includes(recipe.id)) {
        this.cooks.set(recipe.id, true);
      }
      else {
        this.cooks.set(recipe.id, false);
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
        if (data === true) {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([this.currentUrl]);
          });
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }

  // update recipe
  onUpdate(recipe: Recipe): void {
    console.log(recipe.id);
    this.router.navigate(['/add', { recipe: JSON.stringify(recipe) }], { skipLocationChange: true });
  }
}
