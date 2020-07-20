import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../core/shared.module';


@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        RouterModule,
        SharedModule.forRoot()
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule { }
