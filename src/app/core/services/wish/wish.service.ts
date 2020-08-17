import { Injectable } from '@angular/core';

import { SetEntities } from '@datorama/akita/src/setEntities';

import { ApiService } from '../../../core/services/api/api.service';
import { IPhoneWishState } from '../../../shared/models/wish-state.interface';
import { WishEl } from '../../../shared/models/wish-el.model';
import { WishListStore, IWishListState } from '../../../shared/store/wish-list.store';
import { GuestUserStore } from '../../../shared/store/guest-user.store';
import { GuestUser } from '../../../shared/models/guest-user.model';

const DEFAULT: string = 'default';

@Injectable({
  providedIn: 'root',
})
export class WishService {

  private action: string = DEFAULT;

  constructor(
      private wishListStore: WishListStore,
      private guestUserStore: GuestUserStore,
      private api: ApiService,
  ) {
  }

  public toggleWishList(wishState: IPhoneWishState, action: string = DEFAULT): void {
    this.action = action;
    const guestUser: GuestUser = this.guestUserStore.getValue();
    if (wishState.state) {
      this.api.post(`/wish_lists/add_el/${guestUser.id}`, {
        phone_id: wishState.phone.id,
      }).subscribe((res) => {
        const wishList = res['wish_list'];
        if (res['error'] == undefined) {
          const wishEl: WishEl = {
            id: wishList['id'],
            phone: wishList['phone'],
            createdAt: wishList['created_at'],
          };
          this.addToWishList(wishEl);
        }
      });
    } else {
      this.api.post(`/wish_lists/remove_el/${guestUser.id}`, {
        phone_id: wishState.phone.id,
      }).subscribe((res) => {
        if (res['error'] == undefined) {
          const wishList = res['wish_list'];
          const wishEl: WishEl = {
            id: wishList['id'],
            phone: wishList['phone'],
            createdAt: wishList['created_at'],
          };
          this.removeFromWishList(wishEl);
        }
      });
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

    keys.forEach((wishId) => {
      if (wishList[wishId]['phone']['id'] === phoneId) {
        isPresent = true;
      }
    });

    return isPresent;
  }

}

