import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesResolve } from './phones.resolve';


const routes: Routes = [
    {
        path: '',
        component: PhonesComponent,
        resolve: {
            phones: PhonesResolve
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [RouterModule]
})
export class PhonesRoutingModule { }
