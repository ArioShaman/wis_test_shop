import { Injectable } from '@angular/core';
import { BasketListStore } from '../../store/basket.store';
import { BasketEl } from '../../../core/models/basket.model';
import { IPhone, createEmptyPhone } from '../../../core/models/phone.interface';
import { GuestUserStore } from '../../../core/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { WishService } from '../../../core/services/wish/wish.service';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

const DEFAULT: string = 'default';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    $isOpenModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    $isOpenFormModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    $activePhone: BehaviorSubject<IPhone> = new BehaviorSubject<IPhone>(createEmptyPhone());
    $countItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    $priceItems: BehaviorSubject<number> = new BehaviorSubject<number>(0.0);
    private action: string = DEFAULT;

    constructor(
        private basketListStore: BasketListStore,
        private guestUserStore: GuestUserStore,
        private api: ApiService,
        private wish: WishService 

    ) { }

    public getItemsCount():Observable<number>{
        return this.$countItems.asObservable();
    }

    public getItemsPrice():Observable<number>{
        return this.$priceItems.asObservable();
    }
    public getOnceItemsPrice(){
        return this.$priceItems.getValue();
    }

    public calculate(){
        let list = this.basketListStore.getValue().entities;
        let count: number = 0;
        let price: number = 0.00;
        for(let item in list){
            count += list[item]['count'];
            let localCount = list[item]['count']
            price += parseFloat(list[item]['phone']['price']) * localCount;
        }
        this.$countItems.next(count);
        this.$priceItems.next(price);
    }

    public addToBasket(basketEl, action = DEFAULT){
        console.log('call add')
        let guest_user = this.guestUserStore.getValue();
        let sendData = {
            phone_id: basketEl.phone.id,
            count: basketEl.count
        }
        this.api.post('/baskets/add_el/' + guest_user.id, 
            sendData
        ).subscribe(
            res =>{
                if(!res['error']){
                    let basketElStore: BasketEl = {
                        id: res['id'],
                        created_at: res['created_at'],
                        phone: res['phone'],
                        count: res['count']
                    }
                    // если уже есть в хранилище элемент
                    if(this.basketListStore.getValue().ids.includes(basketElStore.id)){
                        console.log('update');
                        this.basketListStore.update(basketElStore.id, { count: basketElStore.count });
                    }else{
                        console.log('add');
                        this.basketListStore.add(basketElStore);
                    }
                    this.calculate();
                    this.checkAction(basketElStore)
                    this.closeModal();
                }
            }
        )
    }

    public checkAction( basketEl: BasketEl){
        switch (this.action) {
            case "wish-action":
                this.wish.toggleWishList({
                    phone: basketEl.phone,
                    state: false
                })
                this.action = DEFAULT;
            default:
                break;
        }
    }
    public removeFromBasket(basketEl: BasketEl){
        let guest_user = this.guestUserStore.getValue();
        let sendData = {
            phone_id: basketEl.phone.id,
            count: basketEl.count
        }        
        this.api.post('/baskets/remove_el/' + guest_user.id, 
            sendData
        ).subscribe(
            res =>{
                if(!res['error']){
                    let basketElStore: BasketEl = {
                        id: res['id'],
                        created_at: res['created_at'],
                        phone: res['phone'],
                        count: res['count']
                    }
                    this.basketListStore.remove(basketElStore.id);
                    this.calculate();
                }
            }
        )

    }

    public increment(basketElId){
        let basketEl = this.getBasketElById(basketElId);
        let guest_user = this.guestUserStore.getValue();
        this.basketListStore.update(basketEl.id, { count: basketEl['count'] + 1 });
        this.calculate();
        this.api.post('/baskets/increment/' + guest_user.id,
            {
                basket_id: basketEl.id
            }
        ).subscribe(
            res => {
                if(!res['error']){
                }
            }
        )
    }

    public decrement(basketElId){
        let basketEl = this.getBasketElById(basketElId);
        let guest_user = this.guestUserStore.getValue();
        this.api.post('/baskets/decrement/' + guest_user.id,
            {
                basket_id: basketEl.id
            }
        ).subscribe(
            res => {
                if(!res['error']){
                    this.basketListStore.update(basketEl.id, { count: basketEl['count'] - 1 });
                    this.calculate();
                }
            }
        )
    }

    public createList(basketList){
        this.basketListStore.set(basketList);
        this.calculate();
    }

    public getBasketList(){
        return this.basketListStore.getValue();
    }

    public getActivePhone():IPhone{
        return this.$activePhone.getValue();
    }

    public getBasketElById(id: number){
        let basketEl = this.basketListStore.getValue().entities[id];
        return basketEl;
    }
    

    public openModal(phone: IPhone, action = 'default'){
        this.action = action;
        this.$activePhone.next(phone);
        this.$isOpenModal.next(true);
    }

    public openFormModal(){
        this.$isOpenFormModal.next(true);
    }

    public closeModal(){
        this.$isOpenModal.next(false);
    }    

    public closeFormModal(){
        this.$isOpenFormModal.next(false);
    }  

    public getModalState(){
        return this.$isOpenModal.asObservable();
    }

    public getFormModalState(){
        return this.$isOpenFormModal.asObservable();
    }    
}
