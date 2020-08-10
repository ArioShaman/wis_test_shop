import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IPhone } from '../../../core/models/phone.interface';
import { environment } from '../../../../environments/environment';
import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
  selector: 'phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.sass'],
})

export class PhoneItemComponent implements OnInit {

  @Input('phone') public phone: IPhone;

  public imgHost = environment.hosts.img_host;


  constructor(
    private basket: BasketService,
) { }

  public ngOnInit(): void {
  }

  public addToBasket(): void {
    this.basket.openModal(this.phone);
  }

}
