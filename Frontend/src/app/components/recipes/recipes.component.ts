import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {Like} from '../../models/like';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnChanges {
  @Input() recipes: Recipe[];
  likes: boolean[] = [];
  likedRecipes: number[] = [];

  showEntireRecipe: boolean[] = Array(5).fill(false);

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipesLiked();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onHeartClick(index: number, recipeId: number): void {
    // this.likes[index] = this.likes[index] !== true;

    if (this.likes[index] === false) {
      console.log('like');
      this.likes[index] = true;
      this.recipeService.likeRecipe(recipeId).subscribe((like: Like) => {
        console.log(like);
      });
    }
    else {
      console.log('unlike');
      this.likes[index] = false;
      this.recipeService.unlikeRecipe(recipeId).subscribe((like: Like) => {
        console.log(like);
      });
    }
  }

  getRecipesLiked(): void {
    this.recipeService.recipesLiked().subscribe( (data: number[]) => {
      this.likedRecipes = data;
      console.log(this.likedRecipes);
      this.setLikes();
      console.log(this.likes);
    }, (httpErrorResponse: HttpErrorResponse) => {
      console.log(httpErrorResponse);
      this.likes = Array(5).fill(false);
    });
  }

  setLikes(): void {
    this.likes = [];

    for (const recipe of this.recipes) {
      if (this.likedRecipes.includes(recipe.id)) {
        this.likes.push(true);
      }
      else {
        this.likes.push(false);
      }
    }
  }

  showFullRecipe(i: number): void {
    console.log('full recipe');
    this.showEntireRecipe[i] = !this.showEntireRecipe[i];
  }

  stringToArray(propertyList: string): string[] {
    return propertyList.split('-');
  }

  ingredientsAndQuantities(ingredients: string, quantities: string): string[][] {
    const quantitiesAsArray = this.stringToArray(quantities);
    return this.stringToArray(ingredients).map((x, i) => [x, quantitiesAsArray[i]]);
  }
}
