import { Injectable } from '@angular/core';
import { BasketListStore } from '../../store/basket.store';
import { BasketEl } from '../../../core/models/basket.model';
import { IPhone, createEmptyPhone } from '../../../core/models/phone.interface';
import { GuestUserStore } from '../../../core/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    $isOpenModal:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    $activePhone:BehaviorSubject<IPhone> = new BehaviorSubject<IPhone>(createEmptyPhone());

    constructor(
        private basketListStore: BasketListStore,
        private guestUserStore: GuestUserStore,
        private api: ApiService
    ) { }

    public addToBasket(basketEl){
        console.log(basketEl);
        let guest_user = this.guestUserStore.getValue();
        let sendData = {
            phone_id: basketEl.phone.id,
            count: basketEl.count
        }
        this.api.post('/baskets/add_el/' + guest_user.id, 
            sendData
        ).subscribe(
            res =>{
                console.log(res);
                if(!res['error']){
                    let basketElStore:BasketEl = {
                        id: res['id'],
                        created_at: res['created_at'],
                        phone: res['phone'],
                        count: res['count']
                    }
                    this.addToBasketStore(basketElStore);
                }
            }
        )
    }

    public addToBasketStore(basketEl: BasketEl){
        // если уже есть в хранилище элемент
        if(this.basketListStore.getValue().ids.includes(basketEl.id)){
            this.basketListStore.update(basketEl.id, { count: basketEl.count });
        }else{
            this.basketListStore.add(basketEl);
        }
        this.closeModal();
    }
    public removeFromBasket(basketEl: BasketEl){
        this.basketListStore.remove(basketEl.id);
    }

    public createList(basketList){
        this.basketListStore.set(basketList);
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
    
    public openModal(phone: IPhone){
        this.$activePhone.next(phone);
        this.$isOpenModal.next(true);
    }

    public closeModal(){
        this.$isOpenModal.next(false);
    }    

    public getModalState(){
        return this.$isOpenModal.asObservable();
    }
}
