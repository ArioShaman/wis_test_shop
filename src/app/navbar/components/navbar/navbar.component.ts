import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
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
    
    constructor(
    	private route: ActivatedRoute,
    	private router: Router,
        public wishListStore: WishListStore,
        public basketListStore: BasketListStore,
        private wish: WishService,
        private basket: BasketService
    ) { }

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

    public openWishPopup(){
        this.wish.openModal();
    }
}
