import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Headline } from '../headline';
import { HeadlineService } from '../services';

@Component({
  selector: 'headline',
  styleUrls: ['app/ui/headline.component.css'],
  template: `
    <div class="header">
      <div class="header__title">{{ headline.title }}</div>
      <i
        *ngIf="!headline.loading && headline.data.length > 0"
        (click)=refresh()
        class="material-icons header__refresh"
      >
        cached
      </i>
    </div>
    <div class="items">
      <div
        *ngIf="headline.loading"
        class="state__info"
      >
        <span>Loading...</span>
      </div>
      <div
        *ngIf="!headline.loading && headline.data.length == 0"
        class="state__info"
      >
        <div>Could not load any data :C</div>
        <div (click)=refresh()>
          <i class="material-icons refresh">cached</i>
        </div>
      </div>

      <div
        *ngFor="let item of headline.data"
        class="item"
      >
        <a href="{{ item.url }}" class="item__info" target="_blank">
          <div class="item__info__title">{{ item.title }}</div>
          <div *ngIf="item.description" class="item__info__description">{{ item.description }}</div>
        </a>
        <span class="item__badge">{{ item.points }}</span>
      </div>
    </div>
  `
})
export class HeadlineComponent implements OnInit {
  @Input() headline: Headline

  constructor(private headlineService: HeadlineService) {}

  ngOnInit() {
    this.fetch()
  }

  private fetch() {
    this.headlineService.getHeadline(this.headline.path)
      .subscribe(res => {
        this.headline.data = res
        this.headline.loading = false
      })
  }

  private refresh() {
    this.headline.loading = true
    this.fetch()
  }
}
