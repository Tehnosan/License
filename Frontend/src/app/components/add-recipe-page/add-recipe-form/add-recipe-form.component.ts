import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder){
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

    for (const control of this.getIngredients.controls) {
      console.log(control.get('ingredient').value + ' ' + control.get('quantity').value);
    }
  }

  uploadFileEvt(event): void {
    if (event.target.files && event.target.files[0]) {
      this.fileAttr = event.target.files[0].name;

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}