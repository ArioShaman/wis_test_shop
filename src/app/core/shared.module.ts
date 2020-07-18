import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GuestUserStore } from './store/guest-user.store';


// services
import { ApiService } from './services/api/api.service';
import { GuestUserService } from './services/guest-user/guest-user.service';
import { WishService } from './services/wish/wish.service';

// pipes
import { Seprator } from '../core/pipes/separator.pipe';

@NgModule({
    declarations: [
        Seprator
    ],
    imports: [
        RouterModule,
    ],
    providers: [
        ApiService,
        WishService,
        GuestUserStore,
        GuestUserService,
    ],
    exports: [
        Seprator
    ]
})
export class SharedModule { 
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [Seprator]
        };
    }
}
