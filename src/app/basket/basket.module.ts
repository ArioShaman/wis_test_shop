import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './pages/basket/basket.component';
import { BasketListComponent } from './components/basket-list/basket-list.component';
import { BasketRoutingModule } from './basket-routing.module'



@NgModule({
    declarations: [
    BasketComponent,
    BasketListComponent],
    imports: [
        CommonModule,
        BasketRoutingModule
    ]
})
export class BasketModule { }
