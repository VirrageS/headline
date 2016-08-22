import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'headline',
  styles: [`
    .headline {
      display: block;
      width: 400px;
      height: 400px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 100%;
      border-bottom: 2px solid rgba(0, 0, 0, 0.32);
    }
    .title {
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: uppercase;
      color: #ff5252;
    }
  `],
  template: `
    <div class="headline">
      <div class="header">
        <div class="title">{{ headline.title }}</div>
      </div>
    </div>
  `
})
export class Headline {
  @Input() headline = {};
}
