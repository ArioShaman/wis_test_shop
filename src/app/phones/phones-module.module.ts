import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesListComponent } from './components/phones-list/phones-list.component';
import { PhonesRoutingModule } from './phones-routing.module';
import { PhonesService } from './services/phones.service';
import { PhonesResolve } from './phones.resolve';
import { PhoneItemComponent } from './components/phone-item/phone-item.component';
import { SharedModule } from '../core/shared.module';
import { UiModule } from '../ui/ui.module';

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
        SharedModule.forRoot(),
        CommonModule,
        PhonesRoutingModule,
        UiModule,
    ],
    exports: [
    ]
})
export class PhonesModule { }
