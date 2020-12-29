import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/main-page/navbar/navbar.component';
import { MaterialModule } from './app.material-module';
import { LoginComponent } from './components/open-page/login/login.component';
import { RecipesComponent } from './components/main-page/recipes/recipes.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RecipesComponent
  ],
  imports: [
      HttpClientModule,
      MaterialModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
