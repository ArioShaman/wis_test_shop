import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../core/services/api/api.service';
import { IPhone } from '../../shared/models/phone.interface';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {

  constructor(
    private api: ApiService,
  ) { 
  }

  public getPhones(): Observable<IPhone[]> {
    return this.api.get('/phones');
  }

}
