import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesResolve } from './phones.resolve';
import { GuestGuard } from '../core/guards/guest.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: PhonesComponent,
        canActivate: [GuestGuard],
        resolve: {
            phones: PhonesResolve
        }
    },  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PhonesRoutingModule { }
