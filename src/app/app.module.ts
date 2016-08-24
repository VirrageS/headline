import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import * as services from './services';
const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

@NgModule({
     declarations: [AppComponent],
     imports: [
         BrowserModule,
         HttpModule,
     ],
     providers: [
       ...mapValuesToArray(services),
     ],
     bootstrap: [AppComponent],
 })
 export class AppModule {}
