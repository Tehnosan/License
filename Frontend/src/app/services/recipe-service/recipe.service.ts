import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.backendUrl}/recipes`);
  }
}
