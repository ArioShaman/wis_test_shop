import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { GuestUser, createGuestUser } from '../models/guest-user.model';


export function createInitialState(): GuestUser {
    return {
        id: ''
    };
}

@StoreConfig({ name: 'guest-user' })
export class GuestUserStore extends Store<GuestUser> {
    
    constructor() {
        super(createInitialState());
    }
}
