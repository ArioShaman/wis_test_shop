import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShareDModule } from '../shared/shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ShareDModule,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class NavbarModule { }
