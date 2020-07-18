import { Injectable } from '@angular/core';

import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { IPhone } from '../../../core/models/phone.interface';
import { WishEl } from '../../../core/models/wish-el.model';

import { WishListStore } from '../../../core/store/wish-list.store';
import { GuestUserStore } from '../../../core/store/guest-user.store';

import { ApiService } from '../../../core/services/api/api.service';


@Injectable({
    providedIn: 'root'
})
export class WishService {


    constructor(
        private wishListStore: WishListStore,
        private guestUserStore :GuestUserStore,
        private api: ApiService
    ) { }

    public toggleWishList(wishState: IPhoneWishState){
        let guest_user = this.guestUserStore.getValue();
        if(wishState.state){
            this.api.post('/wish_lists/add_el/'+guest_user.id, {
                phone_id: wishState.phone.id
            }).subscribe(
                res =>{
                    console.log(res);
                    if(!res['error']){
                        let wishEl = {
                            id: res['id'],
                            phone: res['phone'],
                            created_at: res['created_at']
                        }
                        this.addToWishList(wishEl);
                    }
                }
            )
        }else{
            this.api.post('/wish_lists/<remove_el></remove_el>/'+guest_user.id, {
                phone_id: wishState.phone.id
            }).subscribe(
                res =>{
                    console.log(res);
                    if(!res['error']){
                        let wishEl = {
                            id: res['id'],
                            phone: res['phone'],
                            created_at: res['created_at']
                        }
                        this.removeFromWishList(wishEl);
                    }
                }
            )
        }
    }
    public addToWishList(wishEl: WishEl){
        this.wishListStore.add(wishEl);

    }

    public removeFromWishList(wishEl: WishEl){
        this.wishListStore.remove(wishEl.id);
        // console.log(this.wishListStore.getValue());
    }
    public createList(wishList){
        this.wishListStore.set(wishList);
    }

    public checkIsPhoneInWishList(phoneId):boolean{
        var wishList = this.wishListStore.getValue().entities;
        var isPresent:boolean = false;
        for(let wishId in wishList){
            if(wishList[wishId]['phone']['id'] == phoneId){
                isPresent = true;
            } 
        }
        return isPresent;
    }
}





