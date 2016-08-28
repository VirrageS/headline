import { Component } from '@angular/core';
import { Main } from './containers';

import '../../public/css/styles.css';

@Component({
  selector: 'app',
  directives: [
    Main
  ],
  template: `
    <div>
      <main-container></main-container>
    </div>
  `
})
export class AppComponent {}
