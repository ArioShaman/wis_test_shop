import { ID, guid } from '@datorama/akita';

export class GuestUser {

  public id: ID;

}

export function createGuestUser(): GuestUser {
  return{
    id: `guest-user-${guid()}`,
  };
}
