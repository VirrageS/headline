import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Headline, HeadlineService } from '../shared';
import * as _ from 'lodash';

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

  private _fetch(flash: boolean = false) {
    this._headlineService.getHeadline(this.headline.path)
      .subscribe(res => {
        let previous = this.headline.data
        this.headline.data = res

        if (flash) {
          let newData = []
          _.each(this.headline.data, (newRow) => {
            let ok: boolean = false
            _.each(previous, (oldRow) => {
              if (oldRow.title == newRow.title) {
                ok = true;
              }
            })

            if (!ok) {
              newData.push(newRow)
            }
          })

          _.map(newData, (row) => {
            row.isNew = true
          })
        }

        this.headline.loading = false
      })
  }

  private _refresh(flash: boolean = false) {
    this.headline.loading = true
    this._fetch(flash)
  }
}
