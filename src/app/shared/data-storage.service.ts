import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();

        this.http.put('https://ng-course-recipe-book-5c430.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-5c430.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
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
        }));
    }
}