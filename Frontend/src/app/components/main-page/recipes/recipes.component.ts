import {Component, OnInit } from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  onHeartClick(event): void {
    if (event.target.classList.contains('red')) {
      event.target.classList.remove('red');
    }
    else {
      event.target.classList.add('red');
    }
  }

  handleAddButton(): void {
    this.router.navigateByUrl('/add');
  }
}
