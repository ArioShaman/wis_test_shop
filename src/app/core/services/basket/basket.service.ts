import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { BasketListStore, IBasketListState } from '../../store/basket.store';
import { BasketEl } from '../../../core/models/basket.model';
import { IPhone, createEmptyPhone } from '../../../core/models/phone.interface';
import { GuestUserStore } from '../../../core/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { WishService } from '../../../core/services/wish/wish.service';
import { GuestUser } from '../../models/guest-user.model';


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
    const list: IBasketListState = this.basketListStore.getValue().entities;
    let count: number = 0;
    let price: number = 0.00;
    const keys: string[] = Object.keys(list);

    for (const key of keys) {
      const item = list[key];
      count += item.count;
      const localCount = item.count;
      price += parseFloat(item['phone']['price']) * localCount;
    }

    this.countItems$.next(count);
    this.priceItems$.next(price);
  }

  public addToBasket(basketEl: IBasketListState, action: string = DEFAULT): void {
    const guestUser: GuestUser = this.guestUserStore.getValue();
    const sendData = {
      phone_id: basketEl.phone.id,
      count: basketEl['count'],
    };
    this.addToBasketByApi(guestUser, sendData);
  }

  public removeFromBasket(basketEl: BasketEl): void {
    const guestUser = this.guestUserStore.getValue();
    const sendData = {
      phone_id: basketEl.phone.id,
      count: basketEl.count,
    };
    this.removeFromBasketByApi(guestUser, sendData);
  }
  public checkAction(basketEl: BasketEl): void {
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

  public increment(basketElId: number): void {
    const basketEl: IBasketListState = this.getBasketElById(basketElId);
    const guestUser = this.guestUserStore.getValue();

    this.apiIncrement(guestUser, basketEl);
  }


  public decrement(basketElId: number): void {
    const basketEl = this.getBasketElById(basketElId);
    const guestUser = this.guestUserStore.getValue();

    this.apiDecrement(guestUser, basketEl);
  }

  public createList(basketList: BasketEl[]): void {
    this.basketListStore.set(basketList);
    this.calculate();
  }

  public getBasketList(): IBasketListState {
    return this.basketListStore.getValue();
  }

  public getActivePhone(): IPhone {
    return this.activePhone$.getValue();
  }

  public getBasketElById(id: number): IPhone {
    const basketEl = this.basketListStore.getValue().entities[id];

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

  protected apiIncrement(guestUser: GuestUser, basketEl: IBasketListState): void {
    this.api.post(`/baskets/increment/${guestUser.id}`, { basket_id: basketEl.id }).subscribe(
      (res) => {
        if (!res['error']) {
          this.basketListStore.update(basketEl.id, { count: basketEl.count + 1 });
          this.calculate();
        }
      });
  }
  protected apiDecrement(guestUser: GuestUser, basketEl: IBasketListState): void {
    this.api.post(`/baskets/decrement/${guestUser.id}` , { basket_id: basketEl.id }).subscribe(
    (res) => {
      if (!res['error']) {
        this.basketListStore.update(basketEl.id, { count: basketEl.count - 1 });
        this.calculate();
      }
    });
  }

  protected addToBasketByApi(guestUser: GuestUser, sendData: Object): void {
    this.api.post(`/baskets/add_el/${guestUser.id}`, sendData).subscribe((res) => {
      if (!res['error']) {
        const basketElStore: BasketEl = {
          id: res['id'],
          created_at: res['created_at'],
          phone: res['phone'],
          count: res['count'],
        };

        // если уже есть в хранилище элемент
        if (this.basketListStore.getValue().ids.includes(basketElStore.id)) {
          this.basketListStore.update(basketElStore.id, { count: basketElStore.count });
        } else {
          this.basketListStore.add(basketElStore);
        }
        this.calculate();
        this.checkAction(basketElStore);
        this.closeModal();
      }
    });
  }
  protected removeFromBasketByApi(guestUser: GuestUser, sendData: Object): void{
    this.api.post(`/baskets/remove_el/${guestUser.id}`, sendData).subscribe((res) => {
      if (!res['error']) {
        const basketElStore: BasketEl = {
          id: res['id'],
          created_at: res['created_at'],
          phone: res['phone'],
          count: res['count'],
        };
        this.basketListStore.remove(basketElStore.id);
        this.calculate();
      }
    });
  }

}
