import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { WishPopupComponent } from './wish-popup/wish-popup.component';
import { WishItemShortComponent } from './wish-item-short/wish-item-short.component';
import { LikeComponent } from './like/like.component';
import { BasketPopupComponent } from './basket-popup/basket-popup.component';

@NgModule({
  declarations: [
    WishPopupComponent,
    WishItemShortComponent,
    LikeComponent,
    BasketPopupComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    WishPopupComponent,
    LikeComponent,
    BasketPopupComponent,
  ],
})
export class UiModule { }
