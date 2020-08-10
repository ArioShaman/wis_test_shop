import { Component, OnInit, Input } from '@angular/core';

import { WishService } from '../../core/services/wish/wish.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'wish-item-short',
  templateUrl: './wish-item-short.component.html',
  styleUrls: ['./wish-item-short.component.sass'],
})
export class WishItemShortComponent implements OnInit {

  @Input('wishId') public wishId: number;

  public wishEl;
  public imgHost = environment.hosts.img_host;

  constructor(
    private wish: WishService,
  ) { }

  public ngOnInit(): void {
    this.wishEl = this.wish.getWishElById(this.wishId);
  }

}
