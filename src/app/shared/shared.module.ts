import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { Seprator } from './pipes/separator.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    Seprator,
    LocalizedDatePipe,
  ],
  declarations: [
    Seprator,
    LocalizedDatePipe,
  ],
})

export class ShareDModule { }
