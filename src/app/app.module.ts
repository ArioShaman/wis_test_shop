    import { AppComponent } from './app.component';

// system modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// downloaded modules


// Custom modules
// import { SharedModule } from './core/shared.module';
import { PhonesModule } from './phones/phones-module.module';
import { NavbarModule } from './navbar/nabar.module';
import { BasketModule } from './basket/basket.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';



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
        RouterModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
    ],
    exports:[
        RouterModule,
    ],
    providers: [
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
