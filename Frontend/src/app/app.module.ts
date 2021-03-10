import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './app.material-module';
import { LoginComponent } from './components/open-page/login/login.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { AddRecipeFormComponent } from './components/add-recipe-page/add-recipe-form/add-recipe-form.component';
import { ProfileHeaderComponent } from './components/profile-page/profile-header/profile-header.component';
import { AddRecipePageComponent } from './components/add-recipe-page/add-recipe-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { CropperComponent } from './components/cropper/cropper.component';
import { UploadImageComponent } from './components/profile-page/upload-image/upload-image.component';
import { RecipesPageComponent } from './components/recipes-page/recipes-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RecipesComponent,
    AddRecipeFormComponent,
    ProfileHeaderComponent,
    AddRecipePageComponent,
    HomePageComponent,
    ProfilePageComponent,
    SignUpPageComponent,
    CropperComponent,
    UploadImageComponent,
    RecipesPageComponent
  ],
  imports: [
      HttpClientModule,
      MaterialModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
