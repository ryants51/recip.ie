import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
    constructor(private shoppingListService: ShoppingListService) {}

    private recipes: Recipe[] = [
        new Recipe('A test recipe',
                   'This is a test',
                   'https://www.reluctantgourmet.com/wp-content/uploads/2015/10/r_stock_pot.jpg',
                    [
                        new Ingredient('meat', 1),
                        new Ingredient('gravy', 3)
                    ]),
        new Recipe('Another test recipe',
                   'This is a test',
                   'https://www.reluctantgourmet.com/wp-content/uploads/2015/10/r_stock_pot.jpg',
                   [
                       new Ingredient('bread', 1),
                       new Ingredient('dressing', 2)
                   ])
    ];

      getRecipes() {
          return this.recipes.slice(); // Returns an exact copy but not the original
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.shoppingListService.addIngredients(ingredients);
      }
}