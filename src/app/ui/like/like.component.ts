import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { IPhone } from '../../core/models/phone.interface';
import { WishService } from '../../core/services/wish/wish.service';

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
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterContentChecked(): void {
    this.inWishList$ = this.wishService.checkIsPhoneInWishList(this.phone.id);
  }

  public hover(): void {
    this.hoveredLike = !this.hoveredLike;
  }

  public toggleIntoWishList(): void {
    this.inWishList$ = !this.inWishList$;
    this.wishService.toggleWishList({
      phone: this.phone,
      state: this.inWishList$,
    }, this.action);

  }
}
