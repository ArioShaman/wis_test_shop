import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '../ui/ui.module';
import { SharedModule } from '../shared/shared.module';

import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesListComponent } from './components/phones-list/phones-list.component';
import { PhonesRoutingModule } from './phones-routing.module';
import { PhonesService } from './services/phones.service';
import { PhonesResolve } from './phones.resolve';
import { PhoneItemComponent } from './components/phone-item/phone-item.component';


@NgModule({
  declarations: [
    PhonesComponent,
    PhonesListComponent,
    PhoneItemComponent,
  ],
  providers: [
    PhonesService,
    PhonesResolve,
  ],
  imports: [
    CommonModule,
    PhonesRoutingModule,
    UiModule,
    SharedModule,
  ],
  exports: [],
})
export class PhonesModule { }
