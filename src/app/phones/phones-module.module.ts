import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesComponent } from './pages/phones/phones.component';
import { PhonesListComponent } from './components/phones-list/phones-list.component';
import { PhonesRoutingModule } from './phones-routing.module'



@NgModule({
    declarations: [
        PhonesComponent,
        PhonesListComponent
    ],
    imports: [
        CommonModule,
        PhonesRoutingModule
    ]
})
export class PhonesModule { }
