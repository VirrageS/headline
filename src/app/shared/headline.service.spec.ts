import { inject, async, TestBed } from '@angular/core/testing';
import { BrowserModule  } from '@angular/platform-browser';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ApiService } from './api.service';
import { HeadlineService } from './headline.service';


describe('HeadlineService', () => {
  let headlineSerivce: HeadlineService;
  let mockbackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        ApiService,
        HeadlineService
      ]
    })
  })

  beforeEach(inject([HeadlineService, MockBackend], (service, mock) => {
    headlineSerivce = service;
    mockbackend = mock;
  }))

  it('should get headline', () => {
     let connection;
     let response = [
       {title: "Title", description: "", url: "github.com/someth/ing", points: 20},
       {title: "Title", description: "", url: "github.com/someth/ing", points: 20},
       {title: "Title", description: "", url: "github.com/someth/ing", points: 20}
     ];

     mockbackend.connections.subscribe(connection => {
       connection.mockRespond(new Response(
         new ResponseOptions({body: JSON.stringify(response), status: 200})
       ))
     })

     headlineSerivce.getHeadline('/github')
       .subscribe(notes => {
         expect(notes).toEqual(response);
       })
  })
})
