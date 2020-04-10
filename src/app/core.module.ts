import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoggingService } from './logging.service';

@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService, // These two should be provided though providedIn
        { // We HAVE to do it this way for interceptors. There is no other way.
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptorService, 
            multi: true
        }
    ]
})
export class CoreModule {}