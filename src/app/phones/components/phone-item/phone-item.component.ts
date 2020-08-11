import { Component, OnInit, Input } from '@angular/core';

import { IPhone } from '../../../shared/models/phone.interface';
import { environment } from '../../../../environments/environment';
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
