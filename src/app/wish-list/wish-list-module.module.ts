import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared.module';
import { WishListRoutingModule } from './wis-list-routing.module';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { WishItemComponent } from './components/wish-item/wish-item.component';

@NgModule({
    declarations: [
        WishListComponent,
        WishItemComponent
    ],
    providers: [
    ],
    imports: [
        SharedModule.forRoot(),
        CommonModule,
        WishListRoutingModule
    ],
    exports: [
    ]
})
export class WishListModule { }
