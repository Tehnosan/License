import {
  Component,
  ElementRef, EventEmitter,
  OnInit,
  ViewChild
} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../../../models/recipe';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css']
})
export class AddRecipeFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  optionalUrl: string;

  imageURL = '';
  imageChangedEvent: any = '';

  recipeForm: FormGroup;

  ingredientsError = false;
  stepsError = false;
  generalError = false;

  update = false;
  recipeIdToUpdate: number;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService,
              private router: Router, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    // create recipe form
    this.recipeForm = new FormGroup({
      name: new FormControl( '', [Validators.required]), // name of the recipe
      image: new FormControl('', [this.imageValidator(this)]),
      ingredients: new FormArray([], [Validators.required]),  // array with the ingredients
      steps: new FormArray([], [Validators.required])  // array with the steps
    });

    // get recipe needed to update from url
    const recipe = JSON.parse(this.route.snapshot.paramMap.get('recipe')) as Recipe;
    // if recipe exists initialize form with recipe properties and set update to true
    if (recipe !== null) {
      this.initForm(recipe);
      this.update = true;
    }
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
    if (this.generalError === false) {
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

      // call update or add
      if (this.update === true) {
        this.recipeService.updateRecipe(this.recipeIdToUpdate, this.getFormControls.name.value, this.imageURL,
          ingredientsNames, quantitiesAsString, stepsAsString).subscribe(res => console.log(res));
        console.log('updated');

        this.router.navigateByUrl('/profile');
      }
      else {
        this.recipeService.addRecipe(this.getFormControls.name.value, this.imageURL, ingredientsNames, quantitiesAsString,
          stepsAsString).subscribe(res => console.log(res));
        console.log('added');

        this.router.navigateByUrl('/home');
      }
      // console.log(this.getFormControls.name.value);
      // console.log(ingredientsNames);
      // console.log(quantitiesAsString);
      // console.log(stepsAsString);
    }
  }

  public validateForm(): void {
    this.generalError = false;

    if (this.getIngredients.length === 0) {
      this.ingredientsError = true;
    }

    if (this.getSteps.length === 0) {
      this.stepsError = true;
    }

    if (this.getFormControls.name.value === '' || this.ingredientsError === true || this.stepsError === true) {
      this.generalError = true;
    }

    this.getIngredients.controls.forEach(ingredient => {
      if (ingredient.value.ingredient === '' || ingredient.value.quantity === '') {
        this.generalError = true;
      }
    });

    this.getSteps.controls.forEach(step => {
      if (step.value.step === '') {
        this.generalError = true;
      }
    });

    if (this.imageURL === undefined) {
      this.generalError = true;
    }
  }

  // set image change event and set name of the loaded image
  uploadFileEvt(event): void {
    this.imageChangedEvent = event;

    if (event.target.files && event.target.files[0]) {
      this.fileAttr = event.target.files[0].name;
    }
  }

  // select image url
  imageUrlChangedHandler(url: string): void {
    this.imageURL = url;
    this.recipeForm.get('image').setValue('');
  }

  imageValidator(thiss: AddRecipeFormComponent): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (thiss.imageURL === '' || thiss.fileAttr === '') {
        return { imageV: true };
      }
      return null;
    };
  }

  initForm(recipe: Recipe): void {
    this.recipeIdToUpdate = recipe.id;
    this.recipeForm.get('name').setValue(recipe.name);
    this.optionalUrl = recipe.url;

    const zip = (list1, list2) => list1.map((x, i) => [x, list2[i]]);
    for (const [ingredient, quantity] of zip(recipe.ingredients.split('-'), recipe.quantities.split('-'))) {
      this.addNewIngredient();

      this.getIngredients.at(this.getIngredients.length - 1).get('ingredient').setValue(ingredient);
      this.getIngredients.at(this.getIngredients.length - 1).get('quantity').setValue(quantity);
    }

    for (const step of recipe.steps.split('-')) {
      this.addNewStep();

      this.getSteps.at(this.getSteps.length - 1).get('step').setValue(step);
    }
  }
}
