import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
// import "rxjs/add/observable/throw";
import { GuestUser, createGuestUser } from '../../models/guest-user.model';

// Создание нового guestUser
export const MOCK_USER = createGuestUser();

@Injectable({
    providedIn: 'root'
})        

export class GuestUserService {

    constructor() { }

    public setUser(user:GuestUser):Observable<GuestUser>{
        // set ApiCallTo create User
        return of(user);
    }

    public returnGuestUser():Observable<GuestUser>{
        return of(MOCK_USER);
    }
}
