import { Injectable } from '@angular/core';

import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { IPhone } from '../../../core/models/phone.interface';
import { WishEl } from '../../../core/models/wish-el.model';

import { WishListStore } from '../../../core/store/wish-list.store';
import { GuestUserStore } from '../../../core/store/guest-user.store';

import { ApiService } from '../../../core/services/api/api.service';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WishService {
    $isOpenModal:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private wishListStore: WishListStore,
        private guestUserStore :GuestUserStore,
        private api: ApiService
    ) { }

    public toggleWishList(wishState: IPhoneWishState){
        let guest_user = this.guestUserStore.getValue();
        if(wishState.state){
            this.api.post('/wish_lists/add_el/' + guest_user.id, {
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
            this.api.post('/wish_lists/remove_el/'+guest_user.id, {
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
    }
    public createList(wishList){
        this.wishListStore.set(wishList);
    }

    public getWishList(){
        return this.wishListStore.getValue();
    }
    public getWishElById(id: number){
        let wishEl = this.wishListStore.getValue().entities[id];
        return wishEl;
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

    public openModal(){
        this.$isOpenModal.next(true);
    }

    public closeModal(){
        this.$isOpenModal.next(false);
    }    

    public getModalState(){
        return this.$isOpenModal.asObservable();
    }
}





