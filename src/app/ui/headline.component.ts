import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Headline, HeadlineService } from '../shared';

@Component({
  selector: 'headline',
  styleUrls: ['app/ui/headline.component.css'],
  templateUrl: 'app/ui/headline.component.html'
})
export class HeadlineComponent implements OnInit {
  @Input() headline: Headline

  constructor(private _headlineService: HeadlineService) {}

  ngOnInit() {
    this._fetch()
  }

  private _fetch() {
    this._headlineService.getHeadline(this.headline.path)
      .subscribe(res => {
        this.headline.data = res
        this.headline.loading = false
      })
  }

  private _refresh() {
    this.headline.loading = true
    this._fetch()
  }
}
