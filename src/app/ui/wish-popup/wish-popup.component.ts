import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject, from } from 'rxjs';

import { WishService } from '../../core/services/wish/wish.service';

@Component({
  selector: 'wish-popup',
  templateUrl: './wish-popup.component.html',
  styleUrls: ['./wish-popup.component.sass'],
})
export class WishPopupComponent implements OnInit, OnDestroy, AfterContentChecked {

  public isOpen: boolean = false;
  public wishList: any = [];

  private destroyModalStateFlow$: Subject<void> = new Subject<void>();

  constructor(
    private wish: WishService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.wish.getModalState().pipe(takeUntil(this.destroyModalStateFlow$)).subscribe(
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

  public ngOnDestroy(): void {
    this.destroyModalStateFlow$.next();
    this.destroyModalStateFlow$.complete();
  }

}

