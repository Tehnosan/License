import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css']
})
export class AddRecipeFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  imageURL: string;

  recipeForm: FormGroup;

  ingredientsError = false;
  stepsError = false;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private router: Router){
  }

  ngOnInit(): void {
    // create recipe form
    this.recipeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]), // name of the recipe
      ingredients: new FormArray([]),  // array with the ingredients
      steps: new FormArray([])  // array with the steps
    });
  }

  // get controls of the recipe form
  get getFormControls(): any { return this.recipeForm.controls; }

  // get ingredients as an array
  get getIngredients(): FormArray { return this.getFormControls.ingredients as FormArray; }

  // get steps as an array
  get getSteps(): FormArray { return this.getFormControls.steps as FormArray; }

  // add a new ingredient component
  addNewIngredient(): void {
    this.ingredientsError = false;
    this.getIngredients.push(this.formBuilder.group({
      ingredient: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    }));
  }

  // add a new step component
  addNewStep(): void {
    this.stepsError = false;
    this.getSteps.push(this.formBuilder.group({
      step: new FormControl('', [Validators.required]),
    }));
  }

  // remove the ingredient component from position index
  removeIngredient(index: number): void {
    this.getIngredients.removeAt(index);
  }

  // remove the step component from position index
  removeStep(index: number): void {
    this.getSteps.removeAt(index);
  }

  onSubmit(): void {
    if (this.getIngredients.length === 0) {
      this.ingredientsError = true;
    }

    if (this.getSteps.length === 0) {
      this.stepsError = true;
    }

    if (this.ingredientsError === false && this.stepsError === false) {
      const ingredients = this.getIngredients;
      const steps = this.getSteps;

      let ingredientsNames = '';
      let quantitiesAsString = '';
      ingredients.controls.forEach(ingredient => {
        ingredientsNames += ingredient.value.ingredient;
        ingredientsNames += '-';
        quantitiesAsString += ingredient.value.quantity;
        quantitiesAsString += '-';
      });

      let stepsAsString = '';
      steps.controls.forEach(step => {
        stepsAsString += step.value.step;
        stepsAsString += '-';
      });

      ingredientsNames = ingredientsNames.slice(0, -1);
      quantitiesAsString = quantitiesAsString.slice(0, -1);
      stepsAsString = stepsAsString.slice(0, -1);

      this.recipeService.addRecipe({ name: this.getFormControls.name.value, url: this.imageURL, ingredients: ingredientsNames, quantities: quantitiesAsString, steps: stepsAsString }).subscribe(res => console.log(res));

      this.router.navigateByUrl('/main');
    }
  }

  uploadFileEvt(event): void {
    if (event.target.files && event.target.files[0]) {
      this.fileAttr = event.target.files[0].name;

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        console.log(this.imageURL);
      };
      reader.readAsDataURL(event.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}
