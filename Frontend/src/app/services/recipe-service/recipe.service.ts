import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/recipe';
import {TokenStorageService} from '../token-storage-service/token-storage.service';
import {Like} from '../../models/like';
import {AuthUser} from '../../models/user';

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

  addRecipe(name: string, url: string, ingredients: string, quantities: string, steps: string): Observable<Recipe> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    const recipe: Recipe = { id: -1, name, url, ingredients, quantities, steps, user: this.tokenStorageService.getUsername() };

    return this.http.post<Recipe>(`${this.backendUrl}/add-recipe`, recipe, { headers });
  }

  likeRecipe(recipeId: number): Observable<Like> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    const like = { recipeId, user: this.tokenStorageService.getUsername() };
    console.log('like service');
    return this.http.post<Like>(`${this.backendUrl}/like`, like, { headers });
  }

  unlikeRecipe(recipeId: number): Observable<Like> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    const like = { recipeId, user: this.tokenStorageService.getUsername() };
    console.log('unlike service');
    return this.http.post<Like>(`${this.backendUrl}/unlike`, like, { headers });
  }

  recipesLiked(): Observable<number[]> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get<number[]>(`${this.backendUrl}/recipes-liked/${this.tokenStorageService.getUsername()}`, {headers});
  }

  updateProfileImage(imageUrl: string): Observable<string> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    const user = new AuthUser(this.tokenStorageService.getUsername(), '', '', '', imageUrl);

    return this.http.put<string>(`${this.backendUrl}/update-profile-image`, user, { headers });
  }
}
