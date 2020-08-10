import { Component, OnInit } from '@angular/core';

import { BasketService } from '../../core/services/basket/basket.service';
import { IPhone } from '../../core/models/phone.interface';
import { environment } from '../../../environments/environment';
import { BasketEl } from '../../core/models/basket.model';

import { IBasketListState } from 'src/app/core/store/basket.store';


@Component({
  selector: 'basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.sass']
})
export class BasketPopupComponent implements OnInit {
  public isOpen: boolean = false;
  public activePhone: IPhone;
  public count: number = 1;
  public imgHost = environment.hosts.img_host;
  public curPrice:number;

  constructor(
    private basket: BasketService,
  ) { }

  public ngOnInit(): void {
    this.basket.getModalState().subscribe(
      (res) => {
        this.count = 1;
        this.isOpen = res;
        this.activePhone = this.basket.getActivePhone();
        this.curPrice = parseFloat(this.activePhone.price);
      }
    );
  }

  public close(): void {
    this.basket.closeModal();
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
  }

}
