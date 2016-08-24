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
export class Headlines {
  headlines = [
    {title: "Github", path: "/github", data: [], loading: true},
    {title: "Reddit", path: "/reddit", data: [], loading: true},
    {title: "Hacker News", path: "/hackernews", data: [], loading: true},
    {title: "ProductHunt", path: "/producthunt", data: [], loading: true},
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
        headline.data = res

        if (headline.data.length == 0) {
          setTimeout(this.fetchHeadline(headline), 500)
        } else {
          headline.loading = false
        }
      })
  }
}
