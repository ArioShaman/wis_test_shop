import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { Seprator } from './pipes/separator.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,

    Seprator,
    LocalizedDatePipe,
  ],
  declarations: [
    Seprator,
    LocalizedDatePipe,
  ],
})

export class SharedModule { }
