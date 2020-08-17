import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { BasketListStore, IBasketListState } from '../../../shared/store/basket.store';
import { BasketEl } from '../../../shared/models/basket.model';
import { IPhone, createEmptyPhone } from '../../../shared/models/phone.interface';
import { GuestUserStore } from '../../../shared/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { GuestUser } from '../../../shared/models/guest-user.model';


const DEFAULT: string = 'default';

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  private activePhone$ = new BehaviorSubject<IPhone>(createEmptyPhone());
  private countItems$ = new BehaviorSubject<number>(0);
  private priceItems$ = new BehaviorSubject<number>(0.0);

  private action: string = DEFAULT;

  constructor(
    private basketListStore: BasketListStore,
    private guestUserStore: GuestUserStore,
    private api: ApiService,
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

    keys.forEach((key) => {
      const item = list[key];
      count += item.count;
      const localCount = item.count;
      price += parseFloat(item['phone']['price']) * localCount;
    });

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
    return this.basketListStore.getValue().entities[id];
  }

  protected apiIncrement(guestUser: GuestUser, basketEl: IBasketListState): void {
    this.api.post(
      `/shoping_carts/increment/${guestUser.id}`,
      { shoping_cart_id: basketEl.id },
    ).subscribe(
        (res) => {
          this.basketListStore.update(
            basketEl.id,
            {
              count: parseInt(basketEl.count, 0) + 1,
            },
          );
          this.calculate();
        });
  }
  protected apiDecrement(guestUser: GuestUser, basketEl: IBasketListState): void {
    this.api.post(
      `/shoping_carts/decrement/${guestUser.id}`,
      { shoping_cart_id: basketEl.id },
    ).subscribe(
      (res) => {
        this.basketListStore.update(
          basketEl.id,
          {
            count: basketEl.count - 1,
          },
        );
        this.calculate();
      });
  }

  protected addToBasketByApi(guestUser: GuestUser, sendData: Object): void {
    this.api.post(
      `/shoping_carts/add_el/${guestUser.id}`,
      sendData,
    ).subscribe(
      (res) => {
        const basket = res['shoping_cart'];
        if (res['error'] === undefined) {
          const basketElStore: BasketEl = {
            id: basket['id'],
            createdAt: basket['created_at'],
            phone: basket['phone'],
            count: basket['count'],
          };

          // если уже есть в хранилище элемент
          if (this.basketListStore.getValue().ids.includes(basketElStore.id)) {
            this.basketListStore.update(
              basketElStore.id,
              {
                count: basketElStore.count,
              },
            );

          // иначе создать лемент корзины
          } else {
            this.basketListStore.add(basketElStore);
          }
          this.calculate();
        }
      });
  }
  protected removeFromBasketByApi(guestUser: GuestUser, sendData: Object): void {
    this.api.post(
      `/shoping_carts/remove_el/${guestUser.id}`,
      sendData,
    ).subscribe(
      (res) => {
        if (res['error'] === undefined) {
          const basket = res['shoping_cart'];
          const basketElStore: BasketEl = {
            id: basket['id'],
            createdAt: basket['created_at'],
            phone: basket['phone'],
            count: basket['count'],
          };
          this.basketListStore.remove(basketElStore.id);
          this.calculate();
        }
      });
  }

}
