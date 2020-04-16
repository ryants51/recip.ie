import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(
        //private shoppingListService: ShoppingListService, 
        private store: Store<fromApp.AppState>) {}

    // private recipes: Recipe[] = [
    //     new Recipe('A test recipe',
    //                'This is a test',
    //                'https://www.reluctantgourmet.com/wp-content/uploads/2015/10/r_stock_pot.jpg',
    //                 [
    //                     new Ingredient('meat', 1),
    //                     new Ingredient('gravy', 3)
    //                 ]),
    //     new Recipe('Another test recipe',
    //                'This is a test',
    //                'https://www.reluctantgourmet.com/wp-content/uploads/2015/10/r_stock_pot.jpg',
    //                [
    //                    new Ingredient('bread', 1),
    //                    new Ingredient('dressing', 2)
    //                ])
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); // Returns an exact copy but not the original
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
