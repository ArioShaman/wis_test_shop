import { Injectable, Injector } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { SetEntities } from '@datorama/akita/src/setEntities';

import { ApiService } from '../../../core/services/api/api.service';
import { BasketService } from '../../../core/services/basket/basket.service';
import { IPhoneWishState } from '../../../shared/models/wish-state.interface';
import { WishEl } from '../../../shared/models/wish-el.model';
import { BasketListStore } from '../../../shared/store/basket.store';
import { WishListStore, IWishListState } from '../../../shared/store/wish-list.store';
import { GuestUserStore } from '../../../shared/store/guest-user.store';
import { GuestUser } from '../../../shared/models/guest-user.model';

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
            createdAt: res['created_at'],
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
            createdAt: res['created_at'],
          };
          this.removeFromWishList(wishEl);
        }
      });
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

  public getWishList(): IWishListState {
    return this.wishListStore.getValue();
  }
  public getWishElById(id: number): IWishListState {
    return this.wishListStore.getValue().entities[id];
  }

  public checkIsPhoneInWishList(phoneId: number): boolean {
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

  public getModalState(): IWishListState {
    return this.isOpenModal$.asObservable();
  }

}

