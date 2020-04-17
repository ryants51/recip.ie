import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            // Extract the user and transform to the http request
            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-5c430.firebaseio.com/recipes.json'
            );
        }),
        map(recipes => {
            // There is a difference between the two maps
            // One is an operator and the other is a function called on an array
            return recipes.map(recipe => {
                // ... copies over all of the fields from the previous array
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(
                'https://ng-course-recipe-book-5c430.firebaseio.com/recipes.json', 
                recipesState.recipes
            )
        })
    );
}