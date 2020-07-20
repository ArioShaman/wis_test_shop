import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from '../../../core/services/basket/basket.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'basket-item',
    templateUrl: './basket-item.component.html',
    styleUrls: ['./basket-item.component.sass']
})
export class BasketItemComponent implements OnInit {
    @Input('basketId') basketId: number;
    public basketEl;    
    public imgHost = environment.hosts.img_host;

    constructor(
        private basketService: BasketService
    ) { }

    ngOnInit(): void {
        this.basketEl = this.basketService.getBasketElById(this.basketId);
    }

}
