import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../ui/ui.module';
import { SharedModule } from '../shared/shared.module';

import { BasketComponent } from './pages/basket/basket.component';
import { BasketListComponent } from './components/basket-list/basket-list.component';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { BasketFormComponent } from './components/basket-form/basket-form.component';


@NgModule({
  declarations: [
    BasketComponent,
    BasketListComponent,
    BasketItemComponent,
    BasketFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BasketRoutingModule,
    UiModule,
  ],
})
export class BasketModule { }
