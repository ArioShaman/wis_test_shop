import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';

import { WishService } from '../../core/services/wish/wish.service';

@Component({
  selector: 'wish-popup',
  templateUrl: './wish-popup.component.html',
  styleUrls: ['./wish-popup.component.sass'],
})
export class WishPopupComponent implements
  OnInit,
  OnDestroy,
  AfterContentChecked {

  public wishList: any = [];

  constructor(
    public dialogRef: MatDialogRef<WishPopupComponent>,
    private wish: WishService,
    private router: Router,
  ) { }

  public ngOnInit(): void {}

  public ngAfterContentChecked(): void {
    // Отсортировать по дате не нужно,
    // так как порядок полностью совпадает по возрастанию
    const ids = this.wish.getWishList().ids;
    this.wishList = ids.slice(Math.max(ids.length - 5, 0));
  }

  public close(): void {
    this.dialogRef.close();
  }

  public redirect(): void {
    this.close();
    this.router.navigate(['wish-list']);
  }

  public ngOnDestroy(): void {
  }

}

