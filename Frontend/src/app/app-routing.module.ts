import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/open-page/login/login.component';
import {AuthGuardService} from './services/auth-guard-service/auth-guard.service';
import {AddRecipePageComponent} from './components/add-recipe-page/add-recipe-page.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomePageComponent },
  // { path: 'home', component: HomePageComponent },
  { path: 'add', canActivate: [AuthGuardService], component: AddRecipePageComponent },
  // { path: 'add', component: AddRecipePageComponent },
  { path: 'profile', canActivate: [AuthGuardService],  component: ProfilePageComponent },
  // { path: 'profile', component: ProfilePageComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
