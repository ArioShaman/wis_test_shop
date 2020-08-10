import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { WishService } from '../../core/services/wish/wish.service';

@Component({
  selector: 'wish-popup',
  templateUrl: './wish-popup.component.html',
  styleUrls: ['./wish-popup.component.sass'],
})
export class WishPopupComponent implements OnInit, AfterContentChecked {
  
  public isOpen: boolean = false;
  public wishList: any = [];


  constructor(
    private wish: WishService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.wish.getModalState().subscribe(
      (res) => {
        this.isOpen = res;
      });
  }
  public ngAfterContentChecked(): void {
    // Отсортировать по дате не нужно, так как порядок полностью совпадает по возрастанию
    const ids = this.wish.getWishList().ids;
    this.wishList = ids.slice(Math.max(ids.length - 5, 0));
  }

  public close(): void {
    this.wish.closeModal();
  }

  public redirect(): void {
    this.close();
    this.router.navigate(['wish-list']);
  }

}

