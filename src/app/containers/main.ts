import { Component } from '@angular/core';
import { Headlines } from './headlines';

@Component({
  selector: 'main-container',
  directives: [
    Headlines
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
