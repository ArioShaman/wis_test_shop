import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'

import { WishPopupComponent } from './wish-popup/wish-popup.component';
import { WishItemShortComponent } from './wish-item-short/wish-item-short.component';
import { SharedModule } from '../core/shared.module';
import { LikeComponent } from './like/like.component';
import { BasketPopupComponent } from './basket-popup/basket-popup.component';
import { ShInputComponent } from './sh-input/sh-input.component';

@NgModule({
    declarations: [
        WishPopupComponent,
        WishItemShortComponent,
        LikeComponent,
        BasketPopupComponent,
        ShInputComponent
    ],
    imports: [
        SharedModule.forRoot(),
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        WishPopupComponent, 
        LikeComponent,
        BasketPopupComponent,
        ShInputComponent
    ]
})
export class UiModule { }
