import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

// system modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// downloaded modules
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';

// Custom modules
import { PhonesModule } from './phones/phones-module.module';
import { NavbarModule } from './navbar/nabar.module';
import { UiModule } from './ui/ui.module';
import { BasketModule } from './basket/basket.module';
import { WishListModule } from './wish-list/wish-list-module.module';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';


// locales
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        UiModule,
        NavbarModule,
        PhonesModule,
        WishListModule,
        BasketModule,
        RouterModule,
        TranslateModule.forRoot({ defaultLanguage: 'ru' }),
        environment.production ? [] : AkitaNgDevtools.forRoot(),
    ],
    exports:[
        RouterModule,
        TranslateModule
    ],
    providers: [
        CookieService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
