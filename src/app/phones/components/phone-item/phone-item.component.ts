import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { IPhone } from '../../../shared/models/phone.interface';
import { environment } from '../../../../environments/environment';
import { BasketService } from '../../../core/services/basket/basket.service';
import { BasketPopupComponent } from '../../../ui/basket-popup/basket-popup.component';

@Component({
  selector: 'phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.sass'],
})

export class PhoneItemComponent implements OnInit {

  @Input('phone') public phone: IPhone;

  public imgHost = environment.hosts.img_host;
  public phoneImg: string;

  constructor(
    public dialog: MatDialog,
    private basket: BasketService,
  ) {
  }

  public ngOnInit(): void {
    this.phoneImg = this.imgHost + this.phone.image;
  }

  public addToBasket(): void {
    const dialogRef = this.dialog.open(BasketPopupComponent, {
      width: '800px',
      height: '450px',
      data: {
        activePhone: this.phone,
      },
    });
  }

}
