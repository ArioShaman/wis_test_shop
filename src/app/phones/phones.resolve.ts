import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { IPhone } from '../shared/models/phone.interface';

import { PhonesService } from './services/phones.service';


@Injectable()
export class PhonesResolve implements Resolve<IPhone[]> {

  constructor(private postService: PhonesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<IPhone[]> {
    return this.postService.getPhones();
  }

}