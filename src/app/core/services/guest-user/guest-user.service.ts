import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { GuestUser, createGuestUser } from '../../../shared/models/guest-user.model';
import { GuestUserStore } from '../../../shared/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { WishService } from '../../../core/services/wish/wish.service';
import { BasketService } from '../../../core/services/basket/basket.service';


@Injectable({
  providedIn: 'root',
})

export class GuestUserService {

  constructor(
    private api: ApiService,
    private cookie: CookieService,
    protected guestUserStore: GuestUserStore,
    protected basketService: BasketService,
    public wishService: WishService,
  ) { }

  public checkGuestUserIsExist(): void {
    let guestUser: string = this.cookie.get('guest-user');

    if (guestUser.length === 0) {
      guestUser = JSON.stringify(createGuestUser());
      this.cookie.set('guest-user', guestUser);
      guestUser = JSON.parse(guestUser);
    } else {
      guestUser = JSON.parse(guestUser);
    }
    this.guestUserStore.update({ id: guestUser['id'] });

    this.getUserData(guestUser['id']);
  }

  public getUserData(guestUserId: number): void {
    this.api.get(`/guest_users/${guestUserId}`).subscribe((res) => {
      this.wishService.createList(res['wish_list']);
      this.basketService.createList(res['basket']);
    });
  }

  public returnGuestUser(): GuestUser {
    return this.guestUserStore.getValue();
  }

}

