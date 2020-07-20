import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesResolve } from './phones.resolve';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: PhonesComponent,
        resolve: {
            phones: PhonesResolve
        }
    },  
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            scrollPositionRestoration: 'top'   
        })
    ],
    exports: [RouterModule]
})
export class PhonesRoutingModule { }
