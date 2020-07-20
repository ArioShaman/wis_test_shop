import { Injectable, Injector } from '@angular/core';

import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { IPhone } from '../../../core/models/phone.interface';
import { WishEl } from '../../../core/models/wish-el.model';

import { WishListStore } from '../../../core/store/wish-list.store';
import { GuestUserStore } from '../../../core/store/guest-user.store';
import { BasketListStore } from '../../../core/store/basket.store';

import { ApiService } from '../../../core/services/api/api.service';
import { BasketService } from '../../../core/services/basket/basket.service';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

const DEFAULT: string = 'default';

@Injectable({
    providedIn: 'root'
})
export class WishService {
    $isOpenModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private action: string = DEFAULT;
    private basket: any;

    constructor(
        private wishListStore: WishListStore,
        private guestUserStore :GuestUserStore,
        private api: ApiService,
        private basketListStore: BasketListStore,
        private injector: Injector
    ) { 
    }

    public toggleWishList(wishState: IPhoneWishState, action: string = DEFAULT){
        this.action = action;
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
                        this.checkAction(wishEl)
                    }
                }
            )
        }else{
            this.api.post('/wish_lists/remove_el/' + guest_user.id, {
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

    public checkAction(wishEl: WishEl){
        switch (this.action) {
            case "wish-action":
                let basketList = this.basketListStore.getValue().entities
                let phoneId = wishEl.phone.id;

                let activeBasket;
                for(let item in basketList){
                    let phone =  basketList[item]['phone'];
                    if(phone['id'] == phoneId){
                        activeBasket =  basketList[item];
                        break;
                    }
                }
                // call basket remove action using injector
                this.basket = this.injector.get(BasketService);
                this.basket.removeFromBasket({
                    id: activeBasket.id,
                    phone: activeBasket.phone,
                    count: activeBasket.count,
                    created_at: activeBasket.created_at
                });
                this.action = DEFAULT;
            default:
                break;
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





