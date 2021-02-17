import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'http://localhost:8080/logged';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getAuthHeaders(): HttpHeaders {
    const tokenType = localStorage.getItem('tokenType');
    const accessToken = localStorage.getItem('accessToken');

    return new HttpHeaders({Authorization: tokenType + ' ' + accessToken});
  }

  getRecipes(): Observable<Recipe[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<Recipe[]>(`${this.backendUrl}/recipes`, { headers });
  }

  addRecipe(recipe: { name, url, ingredients, quantities, steps }): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/add-recipe`, recipe, this.httpOptions);
  }
}
