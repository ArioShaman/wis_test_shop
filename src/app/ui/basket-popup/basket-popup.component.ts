import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { BasketService } from '../../core/services/basket/basket.service';
import { WishService } from '../../core/services/wish/wish.service';
import { IPhone } from '../../shared/models/phone.interface';
import { IBasketListState } from '../../shared/store/basket.store';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.sass'],
})

export class BasketPopupComponent implements OnInit {

  public activePhone: IPhone;
  public count: number = 1;
  public imgHost = environment.hosts.img_host;
  public curPrice: number;
  public action: string = 'default';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BasketPopupComponent>,
    private basket: BasketService,
    private wish: WishService
  ) {
    if (data['action'] !== undefined) {
      this.action = data['action'];
    }

    this.activePhone = data['activePhone'];
    this.calculate();
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public calculate(): void {
    this.curPrice = parseFloat(this.activePhone.price) * this.count;
  }

  public increment(): void {
    this.count += 1;
    this.calculate();
  }


  public decrement(): void {
    this.count = this.count === 1 ? 1 : this.count -= 1;
    this.calculate();
  }

  public addToBasket(): void {
    const basketEl: IBasketListState = {
      phone: this.activePhone,
      count: this.count,
    };
    this.basket.addToBasket(basketEl);
    switch (this.action) {
      case 'wish-action':
        this.wish.toggleWishList({
          phone: this.activePhone,
          state: false,
        });
        break;
      default:
        break;
    }
    this.close();
  }

}
