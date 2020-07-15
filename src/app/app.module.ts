import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { PhonesModule } from './phones/phones-module.module'
import { NavbarModule } from './navbar/nabar.module'
import { BasketModule } from './basket/basket.module'

import { ApiService } from './core/services/api/api.service'
import { WishService } from './core/services/wish/wish.service';
// import { AppRoutingModule } from './app-routing.module'
import { PhonesComponent } from './phones/pages/phones/phones.component';
import { BasketComponent } from './basket/pages/basket/basket.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NavbarModule,
        PhonesModule,
        BasketModule,
        RouterModule
    ],
    exports:[
        RouterModule
    ],
    providers: [
        ApiService,
        WishService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
