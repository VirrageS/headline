/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import { provide, Component } from '@angular/core';
import {
  async,
  TestBed,
  ComponentFixture,
  TestComponentBuilder
} from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HeadlineComponent } from './headline.component';
import { HeadlineService, ApiService, Headline } from '../shared';
import { Observable } from 'rxjs/Rx';


let items = [
  {title: "Title1", description: "", url: "github.com/someth/ing1", points: 30},
  {title: "Title2", description: "", url: "github.com/someth/ing2", points: 20},
  {title: "Title3", description: "Some description", url: "github.com/someth/ing3", points: 10},
  {title: "", description: "Some description", url: "github.com/someth/ing4", points: 5},
]

class MockHeadlineService extends HeadlineService {
  constructor() {
    super(null)
  }

  getHeadline(path: string) {
    var shallow = _.clone(items)
    return Observable.of(shallow)
  }
}

@Component({
  selector: 'headlines-container-test',
  directives: [
    HeadlineComponent
  ],
  template: '<headline [headline]="headline"></headline>'
})
class TestComponent {
  headline: Headline = new Headline("Github", "/github")
}


describe('HeadlineComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        HeadlineService,
        ApiService,
        provide(HeadlineService, {useClass: MockHeadlineService})
      ]
    })

    this.fixture = TestBed.createComponent(TestComponent)
  })

  it('should show full list', async(() => {
    this.fixture.whenStable().then(() => {
      const element = this.fixture.nativeElement
      this.fixture.detectChanges()

      expect(element.querySelector('.header__title').innerHTML).toBe("Github")
      expect(element.querySelectorAll('.items').length).toBe(1)

      expect(element.querySelectorAll('a.item').length).toBe(items.length)
      _.each(_.zip<any>(element.querySelectorAll('a.item'), items), (row) => {
        const anchor = row[0], item = row[1]

        const title = anchor.querySelector('.item__info__title')
        expect(title.innerHTML).toBe(item.title)

        if (item.description === "") {
          expect(anchor.querySelectorAll('.item__info__description').length).toBe(0)
          expect(anchor.className).toContain("wide")
        } else {
          expect(anchor.querySelectorAll('.item__info__description').length).toBe(1)
          expect(anchor.querySelector('.item__info__description').innerHTML).toBe(item.description)
        }

        const points = anchor.querySelector('.item__badge')
        expect(points.innerHTML).toBe(item.points.toString())
      })
    })
  }))

  it('should show new element flashed', async(() => {
    this.fixture.whenStable().then(() => {
      const element = this.fixture.nativeElement
      this.fixture.detectChanges()

      items.push(
        {title: "Title5", description: "Some description", url: "github.com/someth/ing5", points: 1}
      )

      element.querySelector('.header__refresh').click()

      this.fixture.detectChanges()
      expect(element.querySelectorAll('a.item').length).toBe(items.length)
      expect(element.querySelectorAll('a.item.flash').length).toBe(1)
    })
  }))

  it('should show info when there is not data to load', async(() => {
    this.fixture.whenStable().then(() => {
      const element = this.fixture.nativeElement
      this.fixture.detectChanges()

      items = []
      element.querySelector('.header__refresh').click()

      this.fixture.detectChanges()
      expect(element.querySelectorAll('a.item').length).toBe(items.length)

      expect(element.querySelectorAll('.state__info div').length).toBe(2)
      expect(element.querySelectorAll('.state__info div')[0].innerHTML).toContain('Could not load any data :C')
    })
  }))

  it('should reload on click when there is no data', async(() => {
    this.fixture.whenStable().then(() => {
      items = []

      const element = this.fixture.nativeElement
      this.fixture.detectChanges()

      expect(element.querySelectorAll('.state__info div').length).toBe(2)
      expect(element.querySelectorAll('.state__info div')[0].innerHTML).toContain('Could not load any data :C')

      items.push(
        {title: "Title5", description: "Some description", url: "github.com/someth/ing5", points: 1}
      )
      element.querySelector('.refresh').click()
      this.fixture.detectChanges()

      expect(element.querySelectorAll('a.item').length).toBe(items.length)
      expect(element.querySelectorAll('a.item.flash').length).toBe(0)
    })
  }))
})
