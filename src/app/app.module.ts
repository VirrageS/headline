import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService, HeadlineService } from './shared';

@NgModule({
     declarations: [AppComponent],
     imports: [
         BrowserModule,
         HttpModule,
     ],
     providers: [
       ApiService,
       HeadlineService,
     ],
     bootstrap: [AppComponent],
 })
 export class AppModule {}
