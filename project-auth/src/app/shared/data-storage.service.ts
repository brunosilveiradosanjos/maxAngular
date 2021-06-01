import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log('getRecipes ', recipes);

    for (let key in recipes) {

      const recipe = recipes[key];
      console.log(recipe)

      this.http
        .post(
          `${environment.api}/recipes`,
          recipe
        )
        .subscribe(response => {
          console.log(response);
        });
    }
  }

  fetchRecipes() {
    // take(1) tell RxJS I only wanna take one value from that observable and thereafter it should automatically unsubscribe
    // exhaustMap waits for the first observable, for the user observable to complete, witch will happen after we took the latest user. Thereafter, it gives us that user, so in exhaustMap we pass in a function there we get the data from that previous observable and now we return a new observable in there which will then replace our previous observable in that entire observable chain.
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .get<Recipe[]>(
            `${environment.api}/recipes`,
            {
              headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
            }
          )
      }),
      map(resData => {
        const recipes: Recipe[] = resData["data"]["recipe"];
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
