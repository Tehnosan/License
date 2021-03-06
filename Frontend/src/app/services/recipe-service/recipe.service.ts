import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<Recipe[]>(`${this.backendUrl}/home-recipes`,  options);
  }

  getProfileRecipes(): Observable<Recipe[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.post<Recipe[]>(`${this.backendUrl}/profile-recipes`, options);
  }

  addRecipe(name: string, url: string, ingredients: string, quantities: string, steps: string): Observable<Recipe> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const recipe: Recipe = { id: -1, name, url, ingredients, quantities, steps, user: this.tokenStorageService.getUsername() };

    return this.http.post<Recipe>(`${this.backendUrl}/recipe`, recipe, { headers });
  }

  likeRecipe(recipeId: number): Observable<Like> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const like = { recipeId, user: this.tokenStorageService.getUsername() };

    return this.http.post<Like>(`${this.backendUrl}/like`, like, { headers });
  }

  unlikeRecipe(recipeId: number): Observable<Like> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('recipeId', recipeId.toString()).set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.delete<Like>(`${this.backendUrl}/like`, options);
  }

  recipesLiked(): Observable<number[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<number[]>(`${this.backendUrl}/liked-recipes`, options);
  }

  updateProfileImage(imageUrl: string): Observable<string> {
    const headers = this.getAuthHeaders();
    headers.set('Content-Type', 'application/json');

    const user = new AuthUser(this.tokenStorageService.getUsername(), '', '', '', imageUrl);

    return this.http.put<string>(`${this.backendUrl}/profile-image`, user, { headers });
  }
}
