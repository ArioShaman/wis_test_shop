import { Injectable, Injector } from '@angular/core';

import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { IPhone } from '../../../core/models/phone.interface';
import { WishEl } from '../../../core/models/wish-el.model';

import { WishListStore, WishListState } from '../../../core/store/wish-list.store';

import { GuestUserStore } from '../../../core/store/guest-user.store';
import { BasketListStore } from '../../../core/store/basket.store';

import { ApiService } from '../../../core/services/api/api.service';
import { BasketService } from '../../../core/services/basket/basket.service';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { GuestUser } from '../../models/guest-user.model';
import { SetEntities } from '@datorama/akita/src/setEntities';

const DEFAULT: string = 'default';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  private isOpenModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private action: string = DEFAULT;
  private basket: any;

  constructor(
      private wishListStore: WishListStore,
      private guestUserStore: GuestUserStore,
      private api: ApiService,
      private basketListStore: BasketListStore,
      private injector: Injector,
  ) {
  }

  public toggleWishList(wishState: IPhoneWishState, action: string = DEFAULT): void {
    this.action = action;
    const guestUser: GuestUser = this.guestUserStore.getValue();
    if (wishState.state) {
      this.api.post(`/wish_lists/add_el/${guestUser.id}`, {
        phone_id: wishState.phone.id,
      }).subscribe((res) => {
        if (!res['error']) {
          const wishEl: WishEl = {
            id: res['id'],
            phone: res['phone'],
            created_at: res['created_at'],
          };
          this.addToWishList(wishEl);
          this.checkAction(wishEl);
        }
      });
    } else {
      this.api.post(`/wish_lists/remove_el/${guestUser.id}`, {
        phone_id: wishState.phone.id,
      }).subscribe((res) => {
        if (!res['error']) {
          const wishEl: WishEl = {
            id: res['id'],
            phone: res['phone'],
            created_at: res['created_at'],
          }
          this.removeFromWishList(wishEl);
        }
      })
    }
  }

  public checkAction(wishEl: WishEl): void {
    switch (this.action) {
      case 'wish-action':
        const basketList = this.basketListStore.getValue().entities;
        const phoneId = wishEl.phone.id;

        const keys = Object.keys(basketList);

        let activeBasket;
        for (const key of keys) {
          const item = basketList[key];
          const phone = item['phone'];
          if (phone['id'] === phoneId) {
            activeBasket = item;
            break;
          }
        }

        // call basket remove action using injector
        this.basket = this.injector.get(BasketService);
        this.basket.removeFromBasket({
          id: activeBasket.id,
          phone: activeBasket.phone,
          count: activeBasket.count,
          created_at: activeBasket.created_at,
        });
        this.action = DEFAULT;
        break;
      default:
        break;
    }
  }

  public addToWishList(wishEl: WishEl): void {
    this.wishListStore.add(wishEl);
  }

  public removeFromWishList(wishEl: WishEl): void {
    this.wishListStore.remove(wishEl.id);
  }
  public createList(wishList: SetEntities<WishEl>): void {
    this.wishListStore.set(wishList);
  }

  public getWishList(): WishListState {
    return this.wishListStore.getValue();
  }
  public getWishElById(id: number): WishListState{
    let wishEl = this.wishListStore.getValue().entities[id];

    return wishEl;
  }

  public checkIsPhoneInWishList(phoneId: number): boolean{
    const wishList = this.wishListStore.getValue().entities;
    let isPresent: boolean = false;

    const keys = Object.keys(wishList);

    for (const wishId of keys) {
      if (wishList[wishId]['phone']['id'] === phoneId) {
        isPresent = true;
      }
    }

    return isPresent;
  }

  public openModal(): void {
    this.isOpenModal$.next(true);
  }

  public closeModal(): void {
    this.isOpenModal$.next(false);
  }

  public getModalState(): WishListState {
    return this.isOpenModal$.asObservable();
  }

}

