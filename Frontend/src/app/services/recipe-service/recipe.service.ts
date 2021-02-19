import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/recipe';
import {TokenStorageService} from '../token-storage-service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'http://localhost:8080/logged';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  getAuthHeaders(): HttpHeaders {
    const tokenType = this.tokenStorageService.getTokenType();
    const accessToken = this.tokenStorageService.getToken();

    return new HttpHeaders({Authorization: tokenType + ' ' + accessToken});
  }

  getHomeRecipes(): Observable<Recipe[]> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<Recipe[]>(`${this.backendUrl}/home-recipes`, this.tokenStorageService.getUsername(), { headers });
  }

  getProfileRecipes(): Observable<Recipe[]> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<Recipe[]>(`${this.backendUrl}/profile-recipes`, this.tokenStorageService.getUsername(), { headers });
  }

  addRecipe(name: string, url: string, ingredients: string, quantities: string, steps: string): Observable<any> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    const recipe: Recipe = { id: -1, name, url, ingredients, quantities, steps, user: this.tokenStorageService.getUsername() };

    return this.http.post<any>(`${this.backendUrl}/add-recipe`, recipe, { headers });
  }
}
