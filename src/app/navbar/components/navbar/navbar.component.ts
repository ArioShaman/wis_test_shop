import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { WishListStore } from '../../../core/store/wish-list.store';
import { BasketListStore } from '../../../core/store/basket.store';

import { WishService } from '../../../core/services/wish/wish.service';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
    public count: number = 0;
    public price: number = 0;
    public isOpenMobileNavbar:boolean = false;

    constructor(
    	private route: ActivatedRoute,
    	private router: Router,
        public wishListStore: WishListStore,
        public basketListStore: BasketListStore,
        private wish: WishService,
        private basket: BasketService
    ) { 
        this.router.events.subscribe(
            event => {
                if(event instanceof NavigationEnd ){
                    this.closeMobileNavbar();
                }
            }
        );
    }

    ngOnInit(): void {
        this.basket.getItemsCount().subscribe(
            res =>{
                this.count = res;
            }
        )
        this.basket.getItemsPrice().subscribe(
            res => {
                this.price = res;
            }
        );
    }

    public openWishPopup(): void {
        this.wish.openModal();
    }

    public openMobileNavbar(): void {
        this.isOpenMobileNavbar = true;
        console.log('open ' + this.isOpenMobileNavbar);
    }

    public closeMobileNavbar(): void {
        console.log('close');
        this.isOpenMobileNavbar = false;
    }
}
