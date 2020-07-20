import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GuestUserStore } from './store/guest-user.store';


// services
import { ApiService } from './services/api/api.service';
import { GuestUserService } from './services/guest-user/guest-user.service';
import { WishService } from './services/wish/wish.service';
import { BasketService } from './services/basket/basket.service';

// pipes
import { Seprator } from '../core/pipes/separator.pipe';
import { LocalizedDatePipe } from '../core/pipes/localized-date.pipe';

@NgModule({
    declarations: [
        Seprator,
        LocalizedDatePipe
    ],
    imports: [
        RouterModule,
    ],
    providers: [
        ApiService,
        WishService,
        GuestUserStore,
        GuestUserService,
        BasketService
    ],
    exports: [
        Seprator,
        LocalizedDatePipe
    ]
})
export class SharedModule { 
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [Seprator, LocalizedDatePipe]
        };
    }
}
