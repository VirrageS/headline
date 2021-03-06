import { Component, OnInit, Input } from '@angular/core';
import { Headline, HeadlineService } from '../shared';
import * as _ from 'lodash';

@Component({
  selector: 'headline',
  styleUrls: ['./headline.component.css'],
  templateUrl: './headline.component.html'
})
export class HeadlineComponent implements OnInit {
  @Input() headline: Headline

  constructor(private _headlineService: HeadlineService) {}

  ngOnInit(): void {
    this._fetch()
  }

  private _fetch(flash: boolean = false) {
    this._headlineService.getHeadline(this.headline.path)
      .subscribe(
        result => {
          _.each(result, (newRow) => {
            newRow.onlyTitle = (newRow.description == "") || !newRow.description
          })

          // check if any item is new. if yes we should mark it
          if (flash) {
            _.each(result, (newRow) => {
              let found: boolean = false
              _.each(this.headline.data, (oldRow) => {
                if (oldRow.title === newRow.title) {
                  found = true;
                }
              })

              newRow.isNew = !found
            })
          }

          this.headline.data = result
          this.headline.loading = false
        },
        error => {
          this.headline.loading = false
        }
      )
  }

  private _refresh(flash: boolean = false) {
    this.headline.loading = true
    this._fetch(flash)
  }
}
