import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/open-page/login/login.component';
import {NavbarComponent} from './components/main-page/navbar/navbar.component';
import {RecipesComponent} from './components/main-page/recipes/recipes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'main', component: RecipesComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
