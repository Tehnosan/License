import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe-service/recipe.service';
import {Recipe} from '../../../models/recipe';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from '../../../services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  fileAttr = 'Choose File';
  imageChangedEvent: any = '';
  imageURL = '';

  constructor(private recipeService: RecipeService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
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
  }

  onSubmit(): void {
    this.recipeService.updateProfileImage(this.imageURL)
      .subscribe(
      data => {
        console.log(data);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
    this.tokenStorageService.saveProfileImage(this.imageURL);
  }
}
