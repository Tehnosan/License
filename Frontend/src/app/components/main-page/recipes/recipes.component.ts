import {Component, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe-service/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  // filedata: any;
  // imageData: any;
  // imageUrl: string;

  constructor(private recipeService: RecipeService) { }

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
  /* File onchange event */
  // fileEvent(e): void {
  //   this.filedata = e.target.files[0];
  //
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.filedata);
  //
  //   reader.onload = () => {
  //     console.log('XXXXXXXXXXXXXXXXXXXXXXX');
  //     console.log(reader.result);
  //     this.imageData = reader.result;
  //   };
  //   reader.onerror = (error) => {
  //     console.log('Error: ', error);
  //   };
  // }

  // btnUpload(): void {
  //
  //   if (this.imageData == null) {
  //     alert('Please select file');
  //   } else{
  //     this.imageUrl = this.imageData.toString();
  //     console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
  //     console.warn(this.imageUrl);
  //   }
  // }

}
