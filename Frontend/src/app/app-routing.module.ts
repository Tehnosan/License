import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/open-page/login/login.component';
import {NavbarComponent} from './components/main-page/navbar/navbar.component';
import {RecipesComponent} from './components/main-page/recipes/recipes.component';
import {AddRecipeFormComponent} from './components/add-recipe-page/add-recipe-form/add-recipe-form.component';
import {AuthGuardService} from './services/auth-guard-service/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', canActivate: [AuthGuardService], component: RecipesComponent },
  { path: 'add', canActivate: [AuthGuardService], component: AddRecipeFormComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
