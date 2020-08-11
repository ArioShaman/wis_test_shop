import { Store, StoreConfig } from '@datorama/akita';

import { GuestUser } from '../models/guest-user.model';


export function createInitialState(): GuestUser {
  return {
    id: '',
  };
}

@StoreConfig({ name: 'guest-user' })
export class GuestUserStore extends Store<GuestUser> {

  constructor() {
    super(createInitialState());
  }

}

