
import { ID, guid } from '@datorama/akita';
export class GuestUser{
    id:ID;
    wishList:Array<any>;
}

export function createGuestUser():GuestUser{
    return{
        id: 'guest-user-'+guid(),
        wishList: []
    }
}


