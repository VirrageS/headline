import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'headline',
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 55px;
      width: 100%;
      border-bottom: 2px solid rgba(0, 0, 0, .32);
    }
    .header__title {
      font-size: 1.3rem;
      font-weight: 500;
      // text-transform: uppercase;
      color: #ff5252;
    }

    .items {
      display: block;
      width: 100%;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 5px 0px;
      min-height: 50px;
      font-weight: 200;

      border-bottom: 1px solid rgba(0, 0, 0, .18);
    }

    .item__info {
      font-size: 0.95rem;
      color: rgba(0, 0, 0, 0.92);
      text-decoration: none !important;
      margin-right: 10px;
    }
    .item__info__title {
      font-weight: 400;
      // color: rgb(30, 158, 231);
    }
    .item__info__description {
      font-size: 0.81em;
      padding: 5px 0px;
    }

    .item__badge {
      display: block;
      margin-left: auto;
      font-size: 0.8rem;
      font-weight: 600;
      background-color: #ff5252;
      color: #ffffff;
      border-radius: 10px;
      min-width: -webkit-min-content;
      min-width: auto;
      padding: 0px 8px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  `],
  template: `
    <div class="header">
      <div class="header__title">{{ headline.title }}</div>
    </div>
    <div class="items">
      <div *ngIf="headline.loading">Loading...</div>
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
export class Headline {
  @Input() headline = {};
}
