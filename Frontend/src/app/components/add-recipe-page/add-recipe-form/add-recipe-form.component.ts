import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../services/auth-service/auth.service';
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

  constructor(private elementRef: ElementRef){

  }

  recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(231, 176, 255)';
  }

  onSubmit(): void {

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
