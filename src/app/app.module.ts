import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { ApiService, HeadlineService } from './shared';
import { HeadlineComponent } from './ui';
import { HeadlinesComponent, MainComponent } from './containers';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
    HeadlineComponent,
    HeadlinesComponent,
    MainComponent
  ],
  providers: [
    ApiService,
    HeadlineService
  ],
  bootstrap: [AppComponent]
 })
 export class AppModule {}
