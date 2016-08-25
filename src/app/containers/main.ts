import { Component } from '@angular/core';
import { HeadlinesComponent } from './headlines.component';

@Component({
  selector: 'main-container',
  directives: [
    HeadlinesComponent
  ],
  template: `
    <div class="main-container">
      <main class="main">
        <headlines-container></headlines-container>
      </main>
    </div>
  `
})
export class Main {}
