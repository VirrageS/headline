import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService, HeadlineService } from './shared';
import { HeadlineComponent } from './ui';
import { HeadlinesComponent } from './containers';

@NgModule({
  declarations: [
    HeadlineComponent,
    HeadlinesComponent,
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
  ],
  providers: [
    ApiService,
    HeadlineService,
  ],
  bootstrap: [AppComponent],
 })
 export class AppModule {}
