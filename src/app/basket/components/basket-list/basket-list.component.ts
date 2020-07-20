import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
    selector: 'basket-list',
    templateUrl: './basket-list.component.html',
    styleUrls: ['./basket-list.component.sass']
})
export class BasketListComponent implements OnInit {
    public basketList:any = [];

    constructor(
        private basketService: BasketService
    ) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(){
        this.basketList = this.basketService.getBasketList().ids;
        console.log(this.basketService.getBasketList());
    }
}
