import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GuestUserStore } from '../shared/store/guest-user.store';

import { ApiService } from './services/api/api.service';
import { GuestUserService } from './services/guest-user/guest-user.service';
import { WishService } from './services/wish/wish.service';
import { BasketService } from './services/basket/basket.service';

@NgModule({

  imports: [
  ],
  providers: [
    ApiService,
    WishService,
    GuestUserService,
    BasketService,
    GuestUserStore,
  ],

})
export class CoreModule {

  public static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        ApiService,
        WishService,
        GuestUserService,
        BasketService,
        GuestUserStore,
      ],
    };
  }

}
