import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';



@NgModule({
    declarations: [
    	NavbarComponent
    ],
    imports: [
	    RouterModule
    ],
    exports: [
    	NavbarComponent
    ]
})
export class NavbarModule { }
