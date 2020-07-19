import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishPopupComponent } from './wish-popup/wish-popup.component';
import { WishItemShortComponent } from './wish-item-short/wish-item-short.component';
import { SharedModule } from '../core/shared.module';

@NgModule({
    declarations: [
        WishPopupComponent,
        WishItemShortComponent
    ],
    imports: [
        SharedModule.forRoot(),
        CommonModule,
        RouterModule,
    ],
    exports: [
        WishPopupComponent
    ]
})
export class UiModule { }
