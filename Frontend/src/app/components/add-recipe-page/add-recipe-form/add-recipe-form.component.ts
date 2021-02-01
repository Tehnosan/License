import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css']
})
export class AddRecipeFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  constructor() { }

  file: File | null = null;
  recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    const x = 6;
  }

  uploadFileEvt(imgFile: any): void {
    // if (imgFile.target.files && imgFile.target.files[0]) {
    //   this.fileAttr = '';
    //   Array.from(imgFile.target.files).forEach((file: File) => {
    //     this.fileAttr += file.name + ' - ';
    //   });
    //
    //   // HTML5 FileReader API
    //   let reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     let image = new Image();
    //     image.src = e.target.result;
    //     image.onload = rs => {
    //       let imgBase64Path = e.target.result;
    //     };
    //   };
    //   reader.readAsDataURL(imgFile.target.files[0]);
    //
    //   // Reset if duplicate image uploaded again
    //   this.fileInput.nativeElement.value = "";
    // } else {
    //   this.fileAttr = 'Choose File';
    // }
  }
}
