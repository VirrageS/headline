/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import {provide} from '@angular/core';
import {
  inject,
  addProviders,
  TestBed,
  ComponentFixture,
  TestComponentBuilder
} from '@angular/core/testing';


import { HeadlineComponent } from './headline.component';
import { HeadlineService } from '../shared';
import { Observable } from 'rxjs/Rx';

class MockHeadlineService extends HeadlineService {
  constructor() {
    super(null);
  }

  getHeadline(path: string) {
    return Observable.of([{
      id: 26,
      title: 'The title',
      contentRendered: '<p><b>Hi there</b></p>',
      contentMarkdown: '*Hi there*'
    }]);
  }
}


describe('test HeadlineComponent', () => {
  TestBed.configureTestingModule({
    providers: [
      provide(HeadlineService, {useClass: MockHeadlineService})
    ]
  });

  // it('should render list', inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
  //   return tcb.createAsync(HeadlineComponent).then((componentFixture: ComponentFixture) => {
  //     const element = componentFixture.nativeElement;
  //     componentFixture.detectChanges();
  //     expect(element.querySelectorAll('span').length).toBe(2);
  //   });
  // }));

});
