import { Component, OnInit } from '@angular/core';
import { WishService } from '../../../core/services/wish/wish.service';

@Component({
    selector: 'wish-list',
    templateUrl: './wish-list.component.html',
    styleUrls: ['./wish-list.component.sass']
})
export class WishListComponent implements OnInit {
    public wishList: any = [];

    constructor(
        private wish: WishService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(){
        this.wishList = this.wish.getWishList().ids;   
    }
}
