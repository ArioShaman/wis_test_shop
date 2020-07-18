
import { ID, guid } from '@datorama/akita';
export class GuestUser{
    id:ID;
}

export function createGuestUser():GuestUser{
    return{
        id: 'guest-user-'+guid(),
    }
}


