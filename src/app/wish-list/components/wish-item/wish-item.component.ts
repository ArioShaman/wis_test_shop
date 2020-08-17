import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { WishService } from '../../../core/services/wish/wish.service';
import { BasketService } from '../../../core/services/basket/basket.service';
import { environment } from '../../../../environments/environment';
import { BasketPopupComponent } from '../../../ui/basket-popup/basket-popup.component';

@Component({
  selector: 'wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.sass'],
})
export class WishItemComponent implements OnInit {

  @Input('wishId') public wishId: number;
  public wishEl;
  public imgHost = environment.hosts.img_host;
  public phoneImg: string;

  constructor(
      public dialog: MatDialog,
      private wish: WishService,
      private basket: BasketService,
  ) { }

  public ngOnInit(): void {
    this.wishEl = this.wish.getWishElById(this.wishId);
    this.phoneImg = this.imgHost + String(this.wishEl.phone.image);
  }

  public addToBasket(): void {
    // this.basket.openModal(this.wishEl.phone, 'wish-action');
    const dialogRef = this.dialog.open(BasketPopupComponent, {
      width: '800px',
      height: '450px',
      data: {
        activePhone: this.wishEl.phone,
        action: 'wish-action',
      },
    });
  }

}
