import { Injectable } from '@angular/core';

import { IPhone } from '../models/phone.interface';
import { WishEl } from '../models/wish-el.model';
import { IPhoneWishState } from '../models/wish-state.interface';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';


export interface WishListState extends EntityState<IPhone> {}

@Injectable({
    providedIn: 'root'
})

@StoreConfig({ name: 'wish-list', resettable: false })
export class WishListStore extends EntityStore<WishListState, WishEl> {
    constructor() {
        super();
    }
}