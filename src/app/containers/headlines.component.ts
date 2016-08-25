import { Component } from '@angular/core';
import { HeadlineComponent } from '../ui';
import { Headline } from '../headline';

@Component({
  selector: 'headlines-container',
  directives: [
    HeadlineComponent
  ],
  styles: [`
    .headlines {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .headline {
      display: block;
      width: 450px;
      min-height: 400px;
      margin: 20px auto;
    }
    @media (max-width: 450px) {
      .headline {
        width: 100%;
      }
    }
  `],
  template: `
    <div class="headlines">
      <headline
        *ngFor="let headline of headlines"
        [headline]="headline"
        class="headline"
      >
      </headline>
    </div>
  `
})
export class HeadlinesComponent {
  headlines: Headline[] = [
    new Headline("Github", "/github"),
    new Headline("Reddit", "/reddit"),
    new Headline("Hacker News", "/hackernews"),
    new Headline("ProductHunt", "/producthunt"),
  ]
}
