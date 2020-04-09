import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipesService: RecipeService, 
        private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();

        this.http.put('https://ng-course-recipe-book-5c430.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        // Extract the user and transform to the http request
        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-5c430.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                // There is a difference between the two maps
                // One is an operator and the other is a function called on an array
                return recipes.map(recipe => {
                    // ... copies over all of the fields from the previous array
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });
            }),
            tap((recipes) => {
                console.log(recipes);
                this.recipesService.setRecipes(recipes);
            })
        );
    }
}