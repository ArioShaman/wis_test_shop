import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { ShareDModule } from '../shared/shared.module';

import { WishPopupComponent } from './wish-popup/wish-popup.component';
import { WishItemShortComponent } from './wish-item-short/wish-item-short.component';
import { LikeComponent } from './like/like.component';
import { BasketPopupComponent } from './basket-popup/basket-popup.component';
import { ShInputComponent } from './sh-input/sh-input.component';

@NgModule({
  declarations: [
    WishPopupComponent,
    WishItemShortComponent,
    LikeComponent,
    BasketPopupComponent,
    ShInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ShareDModule,
  ],
  exports: [
    WishPopupComponent,
    LikeComponent,
    BasketPopupComponent,
    ShInputComponent,
  ],
})
export class UiModule { }
