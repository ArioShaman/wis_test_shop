import { Injectable } from '@angular/core';

import { IPhone } from '../models/phone.interface';
import { BasketEl } from '../models/basket.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
        

export interface State extends EntityState<IPhone> {}

@Injectable({
    providedIn: 'root'
})

@StoreConfig({ name: 'basket-list', resettable: false })
export class BasketListStore extends EntityStore<State, BasketEl> {    
    constructor() {
        super();
    }
}
