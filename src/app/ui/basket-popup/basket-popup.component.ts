import { Component, OnInit, OnDestroy } from '@angular/core';


import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BasketService } from '../../core/services/basket/basket.service';
import { IPhone } from '../../shared/models/phone.interface';
import { IBasketListState } from '../../shared/store/basket.store';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.sass'],
})

export class BasketPopupComponent implements OnInit, OnDestroy {

  public isOpen: boolean = false;
  public activePhone: IPhone;
  public count: number = 1;
  public imgHost = environment.hosts.img_host;
  public curPrice: number;

  private destroyModalStateFlow$: Subject<void> = new Subject<void>();

  constructor(
    private basket: BasketService,
  ) { }

  public ngOnInit(): void {
    this.basket.getModalState()
      .pipe(
        takeUntil(this.destroyModalStateFlow$),
      ).subscribe(
        (res) => {
          this.count = 1;
          this.isOpen = res;
          this.activePhone = this.basket.getActivePhone();
          this.curPrice = parseFloat(this.activePhone.price);
        });
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

  public ngOnDestroy(): void {
    this.destroyModalStateFlow$.next();
    this.destroyModalStateFlow$.complete();
  }

}
