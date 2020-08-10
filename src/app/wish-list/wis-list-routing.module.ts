import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishListComponent } from './pages/wish-list/wish-list.component';


const routes: Routes = [
  {
    path: 'wish-list',
    component: WishListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class WishListRoutingModule { }
