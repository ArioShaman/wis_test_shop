import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { PhonesModule } from './phones/phones-module.module'
import { NavbarModule } from './navbar/nabar.module'
import { BasketModule } from './basket/basket.module'
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ApiService } from './core/services/api/api.service'
import { WishService } from './core/services/wish/wish.service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NavbarModule,
        PhonesModule,
        BasketModule,
        RouterModule
    ],
    exports:[
        RouterModule,
    ],
    providers: [
        ApiService,
        WishService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
