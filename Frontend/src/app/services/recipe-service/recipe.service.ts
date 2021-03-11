import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/recipe';
import {TokenStorageService} from '../token-storage-service/token-storage.service';
import {Like} from '../../models/like';
import {AuthUser} from '../../models/user';
import {Cook} from '../../models/cook';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'http://localhost:8080/logged';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  // returns authorization header
  getAuthHeaders(): HttpHeaders {
    const tokenType = this.tokenStorageService.getTokenType();
    const accessToken = this.tokenStorageService.getToken();

    return new HttpHeaders({Authorization: tokenType + ' ' + accessToken});
  }

  // get recipes not posted by user
  getHomeRecipes(): Observable<Recipe[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<Recipe[]>(`${this.backendUrl}/home-recipes`,  options);
  }

  // get recipes posted by user
  getProfileRecipes(): Observable<Recipe[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<Recipe[]>(`${this.backendUrl}/profile-recipes`, options);
  }

  // save recipe
  addRecipe(name: string, url: string, ingredients: string, quantities: string, steps: string): Observable<Recipe> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const recipe: Recipe = { id: -1, name, url, ingredients, quantities, steps, user: this.tokenStorageService.getUsername() };

    return this.http.post<Recipe>(`${this.backendUrl}/recipe`, recipe, { headers });
  }

  // save user liked recipe with ID=recipeId
  likeRecipe(recipeId: number): Observable<Like> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const like = { recipeId, user: this.tokenStorageService.getUsername() };

    return this.http.post<Like>(`${this.backendUrl}/like`, like, { headers });
  }

  // delete user liked recipe with ID=recipeId
  unlikeRecipe(recipeId: number): Observable<Like> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('recipeId', recipeId.toString()).set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.delete<Like>(`${this.backendUrl}/like`, options);
  }

  // get ids for recipes liked by user
  getIdsOfRecipesLikedBy(): Observable<number[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<number[]>(`${this.backendUrl}/liked-recipes-ids`, options);
  }

  // update user profile image
  updateProfileImage(imageUrl: string): Observable<string> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const user = new AuthUser(this.tokenStorageService.getUsername(), '', '', '', imageUrl);

    return this.http.put<string>(`${this.backendUrl}/profile-image`, user, { headers });
  }

  // get how many recipes user liked
  getnumberOfRecipesLikedBy(): Observable<number> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<number>(`${this.backendUrl}/liked-recipes-number`, options);
  }

  // get a list with recipes liked by user
  getRecipesLikedBy(): Observable<Recipe[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<Recipe[]>(`${this.backendUrl}/liked-recipes`,  options);
  }

  // save user cooked recipe with ID=recipeId
  cookRecipe(recipeId: number): Observable<Cook> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const cook = { recipeId, user: this.tokenStorageService.getUsername() };

    return this.http.post<Cook>(`${this.backendUrl}/cook`, cook, { headers });
  }

  // delete user cooked recipe with ID=recipeId
  uncookedRecipe(recipeId: number): Observable<Cook> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('recipeId', recipeId.toString()).set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.delete<Cook>(`${this.backendUrl}/cook`, options);
  }

  // get ids for recipes cooked by user
  getIdsOfRecipesCookedBy(): Observable<number[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<number[]>(`${this.backendUrl}/cooked-recipes-ids`, options);
  }

  // get how many recipes user cooked
  getnumberOfRecipesCookedBy(): Observable<number> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<number>(`${this.backendUrl}/cooked-recipes-number`, options);
  }

  // get a list with recipes cooked by user
  getRecipesCookedBy(): Observable<Recipe[]> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('user', this.tokenStorageService.getUsername()), headers };

    return this.http.get<Recipe[]>(`${this.backendUrl}/cooked-recipes`,  options);
  }

  // delete recipe with recipeId
  deleteRecipeWith(recipeId: number): Observable<boolean> {
    let headers = this.getAuthHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('recipeId', recipeId.toString()), headers };

    return this.http.delete<boolean>(`${this.backendUrl}/recipe`, options);
  }
}
