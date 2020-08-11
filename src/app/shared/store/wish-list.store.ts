import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { IPhone } from '../models/phone.interface';
import { WishEl } from '../models/wish-el.model';

export interface IWishListState extends EntityState<IPhone> {}

@Injectable({
  providedIn: 'root',
})

@StoreConfig({ name: 'wish-list', resettable: false })
export class WishListStore extends EntityStore<IWishListState, WishEl> {

  constructor() {
    super();
  }

}
