import { Component, OnInit, Input } from '@angular/core';
import { WishService } from '../../../core/services/wish/wish.service';
import { BasketService } from '../../../core/services/basket/basket.service';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'wish-item',
    templateUrl: './wish-item.component.html',
    styleUrls: ['./wish-item.component.sass']
})
export class WishItemComponent implements OnInit {
    @Input('wishId') wishId:number;
    public wishEl;
    public imgHost = environment.hosts.img_host;
    
    constructor(
        private wish: WishService,
        private basket: BasketService
    ) { }

    ngOnInit(): void {
        this.wishEl = this.wish.getWishElById(this.wishId);        
    }

    public addToBasket(){
        this.basket.openModal(this.wishEl.phone, 'wish-action');
    }    

}
