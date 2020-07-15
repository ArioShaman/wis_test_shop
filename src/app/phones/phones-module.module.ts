import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesListComponent } from './components/phones-list/phones-list.component';
import { PhonesRoutingModule } from './phones-routing.module';
import { PhonesService } from './services/phones.service';
import { PhonesResolve } from './phones.resolve';
import { PhoneItemComponent } from './components/phone-item/phone-item.component';
import { Seprator } from '../core/pipes/separator.pipe'

@NgModule({
    declarations: [
        Seprator,
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
        PhonesRoutingModule
    ],
    exports: [
        Seprator
    ]
})
export class PhonesModule { }
