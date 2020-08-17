import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment';
import { GuestUserStore } from '../shared/store/guest-user.store';

import { ApiService } from './services/api/api.service';
import { GuestUserService } from './services/guest-user/guest-user.service';
import { WishService } from './services/wish/wish.service';
import { BasketService } from './services/basket/basket.service';

@NgModule({

  imports: [
    RouterModule.forRoot([], {
      enableTracing: false,
      scrollPositionRestoration: 'top',
    }),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({ defaultLanguage: 'ru' }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    ApiService,
    WishService,
    GuestUserService,
    BasketService,
    GuestUserStore,
    CookieService,
  ],
  exports: [
    RouterModule,
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
        CookieService,
      ],
    };
  }

}
