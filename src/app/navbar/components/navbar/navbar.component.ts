import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { WishListStore } from '../../../core/store/wish-list.store';
import { WishService } from '../../../core/services/wish/wish.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

    constructor(
    	private route: ActivatedRoute,
    	private router: Router,
        public wishListStore: WishListStore,
        private wish: WishService
    ) { }

    ngOnInit(): void {
    }

    public openWishPopup(){
        this.wish.openModal();
    }
}
