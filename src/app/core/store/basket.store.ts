import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { IPhone } from '../models/phone.interface';
import { BasketEl } from '../models/basket.model';


export interface IBasketListState extends EntityState<IPhone> {}

@Injectable({
  providedIn: 'root',
})

@StoreConfig({ name: 'basket-list', resettable: false })
export class BasketListStore extends EntityStore<IBasketListState, BasketEl> {

  constructor() {
    super();
  }

}
