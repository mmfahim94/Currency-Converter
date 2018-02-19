import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { ConverterComponent } from './app.converterComponent'


@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule
  ],
  declarations: [
    AppComponent, ConverterComponent
  ],
  bootstrap: [AppComponent, ConverterComponent]
})

export class AppModule { }
