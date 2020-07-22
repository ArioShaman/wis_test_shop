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
    public count: number;
    public curPrice: number;

    constructor(
        private basketService: BasketService
    ) { 
    }

    ngOnInit(): void {
        this.basketEl = this.basketService.getBasketElById(this.basketId);
        this.count = this.basketEl.count;
        this.calculate();
    }

    public destroyEl(): void {
        this.basketService.removeFromBasket(this.basketEl);
    }

    public encrement(): void {
        this.count += 1;
        this.calculate();
        this.basketService.increment(this.basketEl.id);
    }

    public decrement(): void {
        if(this.count != 1){
            this.count -= 1;
            this.calculate();
            this.basketService.decrement(this.basketEl.id);
        } 
    }

    public calculate(): void {
        this.curPrice =  parseFloat(this.basketEl.phone.price) * this.count;

    }    
}
