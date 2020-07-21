import { Component, OnInit } from '@angular/core';
import { BasketListStore } from '../../../core/store/basket.store'; 
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {
    constructor(
        public basketListStore: BasketListStore,
        private basket: BasketService
    ) { }

    ngOnInit(): void {
    }

    public pay(){
        this.basket.openFormModal();
    }

}
