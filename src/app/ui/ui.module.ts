import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishPopupComponent } from './wish-popup/wish-popup.component';
import { WishItemShortComponent } from './wish-item-short/wish-item-short.component';
import { SharedModule } from '../core/shared.module';
import { LikeComponent } from './like/like.component';
import { BasketPopupComponent } from './basket-popup/basket-popup.component';

@NgModule({
    declarations: [
        WishPopupComponent,
        WishItemShortComponent,
        LikeComponent,
        BasketPopupComponent
    ],
    imports: [
        SharedModule.forRoot(),
        CommonModule,
        RouterModule,
    ],
    exports: [
        WishPopupComponent, 
        LikeComponent,
        BasketPopupComponent
    ]
})
export class UiModule { }
