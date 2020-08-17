import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';

import { IPhone } from '../../shared/models/phone.interface';
import { WishService } from '../../core/services/wish/wish.service';
import { BasketService } from '../../core/services/basket/basket.service';
import { BasketListStore } from '../../shared/store/basket.store';

const DEFAULT: string = 'default';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.sass'],
})
export class LikeComponent implements OnInit, AfterContentChecked {

  @Input('phone') public phone: IPhone;
  @Input('action') public action: string = DEFAULT;
  public inWishList$: boolean = false;
  public hoveredLike: boolean = false;


  constructor(
    private wishService: WishService,
    private basketService: BasketService,
    private basketListStore: BasketListStore,
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterContentChecked(): void {
    this.inWishList$ = this.wishService.checkIsPhoneInWishList(this.phone.id);
  }

  public hover(): void {
    this.hoveredLike = !this.hoveredLike;
  }

  public removeFromBasket(): void {
    if (this.inWishList$) {
      const basketList = this.basketListStore.getValue().entities;
      const phoneId = this.phone.id;

      const keys = Object.keys(basketList);

      let activeBasket;
      keys.forEach((key) => {
        const item = basketList[key];
        const phone = item['phone'];
        if (phone['id'] === phoneId) {
          activeBasket = item;
        }
      });

      // call basket remove action using injector
      this.basketService.removeFromBasket({
        id: activeBasket.id,
        phone: activeBasket.phone,
        count: activeBasket.count,
        createdAt: activeBasket.createdAt,
      });
    }
  }

  public toggleIntoWishList(): void {
    this.inWishList$ = !this.inWishList$;
    this.wishService.toggleWishList({
      phone: this.phone,
      state: this.inWishList$,
    }, this.action);

    this.removeFromBasket();
  }

}

