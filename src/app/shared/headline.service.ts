import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class HeadlineService {

  constructor(private apiService: ApiService) {}

  getHeadline(path: string) {
    return this.apiService.get(path);
  }
}
