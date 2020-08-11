
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '../environments/environment';

import { SharedModule } from './shared/shared.module';
import { UiModule } from './ui/ui.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { WishListModule } from './wish-list/wish-list-module.module';
import { PhonesModule } from './phones/phones-module.module';
import { NavbarModule } from './navbar/nabar.module';
import { BasketModule } from './basket/basket.module';


registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule.forRoot(),
    SharedModule,
    UiModule,
    NavbarModule,
    PhonesModule,
    WishListModule,
    BasketModule,
    TranslateModule.forRoot({ defaultLanguage: 'ru' }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  exports: [
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
