import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { WishService } from '../../../core/services/wish/wish.service';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.sass'],
})
export class WishListComponent implements OnInit, AfterContentChecked {

  public wishList: any = [];

  constructor(
    private wish: WishService,
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterContentChecked(): void {
    this.wishList = this.wish.getWishList().ids;
  }
}
