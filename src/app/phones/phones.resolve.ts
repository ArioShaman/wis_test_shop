import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'; 

import { Observable } from 'rxjs';

import { PhonesService } from './services/phones.service';
import { IPhone } from '../core/models/phone.interface';

@Injectable()
export class PhonesResolve implements Resolve<IPhone[]> {
  constructor(private postService: PhonesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<IPhone[]> {
    return this.postService.getPhones();
  }

}