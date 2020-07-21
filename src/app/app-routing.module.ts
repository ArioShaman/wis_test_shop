import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home', 
        loadChildren: () => import('./phones/phones-module.module').then(m => m.PhonesModule) 
    },
    { 
        path: 'basket', 
        loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) 
    },
    { 
        path: 'wish-list', 
        loadChildren: () => import('./wish-list/wish-list-module.module').then(m => m.WishListModule) 
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes , {
            enableTracing: false,
            scrollPositionRestoration: 'top'   
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }