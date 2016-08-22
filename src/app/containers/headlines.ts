import { Component } from '@angular/core';
import { Headline } from '../ui';

@Component({
  selector: 'headlines-container',
  directives: [
    Headline
  ],
  styles: [`
    .headlines {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `],
  template: `
    <div class="headlines">
      <headline
        *ngFor="let headline of headlines"
        [headline]="headline"
      >
      </headline>
    </div>
  `
})
export class Headlines {
  headlines = [
    {title: "Github"},
    {title: "Reddit"}
  ];
}
