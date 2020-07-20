import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './pages/basket/basket.component';
import { BasketListComponent } from './components/basket-list/basket-list.component';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { SharedModule } from '../core/shared.module';
import { UiModule } from '../ui/ui.module';


@NgModule({
    declarations: [
        BasketComponent,
        BasketListComponent,
        BasketItemComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        BasketRoutingModule,
        UiModule
    ]
})
export class BasketModule { }
