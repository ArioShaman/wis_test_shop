import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { BasketListStore, BasketListState } from '../../store/basket.store';
import { BasketEl } from '../../../core/models/basket.model';
import { IPhone, createEmptyPhone } from '../../../core/models/phone.interface';
import { GuestUserStore } from '../../../core/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { WishService } from '../../../core/services/wish/wish.service';


const DEFAULT: string = 'default';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private isOpenModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isOpenFormModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private activePhone$: BehaviorSubject<IPhone> = new BehaviorSubject<IPhone>(createEmptyPhone());
  private countItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private priceItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0.0);
  private action: string = DEFAULT;

  constructor(
    private basketListStore: BasketListStore,
    private guestUserStore: GuestUserStore,
    private api: ApiService,
    private wish: WishService,

  ) { }

  public getItemsCount(): Observable<number> {
    return this.countItems$.asObservable();
  }

  public getItemsPrice(): Observable<number> {
    return this.priceItems$.asObservable();
  }
  public getOnceItemsPrice(): number {
    return this.priceItems$.getValue();
  }

  public calculate(): void {
    const list = this.basketListStore.getValue().entities;
    let count: number = 0;
    let price: number = 0.00;
    // list.map((item) => {

    // });
    for(let item in list){
      count += list[item]['count'];
      let localCount = list[item]['count']
      price += parseFloat(list[item]['phone']['price']) * localCount;
    }
    this.countItems$.next(count);
    this.priceItems$.next(price);
  }

  public addToBasket(basketEl, action: string = DEFAULT): void {
    const guestUser = this.guestUserStore.getValue();
    const sendData = {
      phone_id: basketEl.phone.id,
      count: basketEl['count']
    }
    this.api.post('/baskets/add_el/' + guestUser.id, sendData).subscribe((res) => {
      if (!res['error']) {
        const basketElStore: BasketEl = {
          id: res['id'],
          created_at: res['created_at'],
          phone: res['phone'],
          count: res['count']
        };
        // если уже есть в хранилище элемент
        if (this.basketListStore.getValue().ids.includes(basketElStore.id)) {
          this.basketListStore.update(basketElStore.id, { count: basketElStore.count });
        } else {
          this.basketListStore.add(basketElStore);
        }
        this.calculate();
        this.checkAction(basketElStore)
        this.closeModal();
      }
    });
  }

  public checkAction( basketEl: BasketEl): void {
    switch (this.action) {
      case 'wish-action':
        this.wish.toggleWishList({
          phone: basketEl.phone,
          state: false,
        });
        this.action = DEFAULT;
        break;
      default:
        break;
    }
  }
  public removeFromBasket(basketEl: BasketEl): void {
    let guestUser = this.guestUserStore.getValue();
    let sendData = {
      phone_id: basketEl.phone.id,
      count: basketEl.count
    }        
    this.api.post('/baskets/remove_el/' + guestUser.id, 
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

  public increment(basketElId): void {
    let basketEl = this.getBasketElById(basketElId);
    let guestUser = this.guestUserStore.getValue();
    this.basketListStore.update(basketEl.id, { count: basketEl['count'] + 1 });
    this.calculate();
    this.api.post('/baskets/increment/' + guestUser.id,
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

  public decrement(basketElId): void {
    let basketEl = this.getBasketElById(basketElId);
    let guestUser = this.guestUserStore.getValue();
    this.api.post('/baskets/decrement/' + guestUser.id,
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

  public createList(basketList): void {
    this.basketListStore.set(basketList);
    this.calculate();
  }

  public getBasketList(): BasketListState {
    return this.basketListStore.getValue();
  }

  public getActivePhone(): IPhone {
    return this.activePhone$.getValue();
  }

  public getBasketElById(id: number): IPhone {
    let basketEl: IPhone = this.basketListStore.getValue().entities[id];

    return basketEl;
  }


  public openModal(phone: IPhone, action: string = 'default'): void {
    this.action = action;
    this.activePhone$.next(phone);
    this.isOpenModal$.next(true);
  }

  public openFormModal(): void {
    this.isOpenFormModal$.next(true);
  }

  public closeModal(): void {
    this.isOpenModal$.next(false);
  }

  public closeFormModal(): void {
    this.isOpenFormModal$.next(false);
  }

  public getModalState(): Observable<boolean> {
    return this.isOpenModal$.asObservable();
  }

  public getFormModalState(): Observable<boolean> {
    return this.isOpenFormModal$.asObservable();
  }
}
