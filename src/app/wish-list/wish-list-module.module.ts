import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '../ui/ui.module';
import { ShareDModule } from '../shared/shared.module';


import { WishItemComponent } from './components/wish-item/wish-item.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { WishListRoutingModule } from './wis-list-routing.module';

@NgModule({
  declarations: [
    WishListComponent,
    WishItemComponent,
  ],
  providers: [
  ],
  imports: [
    UiModule,
    CommonModule,
    WishListRoutingModule,
    ShareDModule,
  ],
  exports: [
  ],
})
export class WishListModule { }
