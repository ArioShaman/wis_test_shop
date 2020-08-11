import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { WishListStore } from '../../../shared/store/wish-list.store';
import { BasketListStore } from '../../../shared/store/basket.store';
import { WishService } from '../../../core/services/wish/wish.service';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  public count: number = 0;
  public price: number = 0;
  public isOpenMobileNavbar: boolean = false;

  private destroyRouteEvents$: Subject<void> = new Subject<void>();
  private destroyItemCountsFlow$: Subject<void> = new Subject<void>();
  private destroyItemsPriceFlow$: Subject<void> = new Subject<void>();


  constructor(
    public wishListStore: WishListStore,
    public basketListStore: BasketListStore,
    private wish: WishService,
    private router: Router,
    private basket: BasketService,
  ) {
    this.router.events.pipe(
      takeUntil(this.destroyRouteEvents$)).subscribe(
        (event) => {
          if (event instanceof NavigationEnd) {
            this.closeMobileNavbar();
          }
        });
  }

  public ngOnInit(): void {
    this.basket.getItemsCount().pipe(
      takeUntil(this.destroyItemCountsFlow$)).subscribe(
        (res) => {
          this.count = res;
        });


    this.basket.getItemsPrice().pipe(
      takeUntil(this.destroyItemsPriceFlow$)).subscribe(
        (res) => {
          this.price = res;
        });
  }

  public openWishPopup(): void {
    this.wish.openModal();
  }

  public openMobileNavbar(): void {
    this.isOpenMobileNavbar = true;
  }

  public closeMobileNavbar(): void {
    this.isOpenMobileNavbar = false;
  }
  public ngOnDestroy(): void {
    this.destroyRouteEvents$.next();
    this.destroyItemCountsFlow$.next();
    this.destroyItemsPriceFlow$.next();

    this.destroyRouteEvents$.complete();
    this.destroyItemCountsFlow$.complete();
    this.destroyItemsPriceFlow$.complete();
  }

}

