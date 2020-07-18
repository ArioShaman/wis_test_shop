import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
// import "rxjs/add/observable/throw";
import { GuestUser, createGuestUser } from '../../models/guest-user.model';
import { CookieService } from 'ngx-cookie-service';
import { GuestUserStore } from '../../store/guest-user.store';

import { ApiService } from '../../../core/services/api/api.service';
import { WishService } from '../../../core/services/wish/wish.service';

@Injectable({
    providedIn: 'root'
})        

export class GuestUserService {

    constructor(
        private api: ApiService,
        private cookie: CookieService,
        protected guestUserStore: GuestUserStore,
        public wishService: WishService
    ) { }

    public checkGuestUserIsExist(){
        let guestUser:string = this.cookie.get('guest-user')
        if(!guestUser.length){
            guestUser = JSON.stringify(createGuestUser())
            this.cookie.set('guest-user', guestUser)
            
        }else{
            guestUser  = JSON.parse(guestUser);
        }
        this.guestUserStore.update({id: guestUser['id'] })
        this.getUserData(guestUser);
    }

    public getUserData(guestUser){
        this.api.get('/guest_users/'+guestUser['id']).subscribe(
            res => {
                console.log(res);
                this.wishService.createList(res['wish_list']);
            }
        );

    }

    public returnGuestUser(){
        return this.guestUserStore.getValue();
    }
}
