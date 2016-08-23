import { Component } from '@angular/core';
import { Headline } from '../ui';
import { HeadlineService } from '../services'

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
      flex-wrap: wrap;
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
  max_items = 10;
  headlines = [
    {title: "Github", path: "/github", data: []},
    {title: "Reddit", path: "/reddit", data: []}
  ];

  constructor(private headlineService: HeadlineService) {
    this.headlines.map(
      headline => (
        this.headlineService.getHeadline(headline.path)
          .subscribe(res => headline.data = res.slice(0, this.max_items))
      )
    )
  }

}
