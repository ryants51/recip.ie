import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { 
    path: 'recipes', 
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) 
  },
  { 
    path: 'shopping-list', 
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  }
];

@NgModule({
  imports: [
    // The preload strategy basically says that once you hit one of the lazy loaded paths, load the other ones
    // This could be set up to load specific components when you get to a specific component
    // The preload strategy basically says that once you hit one of the lazy loaded paths, load the other ones
// This could be set up to load specific components when you get to a specific component
// The preload strategy basically says that once you hit one of the lazy loaded paths, load the other ones
// This could be set up to load specific components when you get to a specific component
// The preload strategy basically says that once you hit one of the lazy loaded paths, load the other ones
// This could be set up to load specific components when you get to a specific component
RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
