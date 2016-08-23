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

    .headline {
      display: block;
      width: 500px;
      min-height: 400px;
      margin: 20px auto;
    }
    @media (max-width: 500px) {
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
export class Headlines {
  max_items = 10
  headlines = [
    {title: "Github", path: "/github", data: [], loading: true},
    {title: "Reddit", path: "/reddit", data: [], loading: true}
  ]

  constructor(private headlineService: HeadlineService) {
    this.fetchHeadlines()
  }

  private fetchHeadlines() {
    this.headlines.map(headline => this.fetchHeadline(headline))
  }

  private fetchHeadline(headline) {
    this.headlineService.getHeadline(headline.path)
      .subscribe(res => {
        headline.data = res.slice(0, this.max_items)

        if (headline.data.length == 0) {
          setTimeout(this.fetchHeadline(headline), 1000)
        } else {
          headline.loading = false
        }
      })
  }
}
