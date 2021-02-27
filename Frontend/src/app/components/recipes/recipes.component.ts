import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {Like} from '../../models/like';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnChanges {
  @Input() recipes: Recipe[];
  likes: boolean[] = [];
  likedRecipes: number[] = [];

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
      // console.log(this.recipes);
      // console.log(this.likedRecipes);
      // console.log('asd');
      this.setLikes();
      // console.log(this.likes);
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
}
