import { Component, OnInit } from '@angular/core';
import { BasketListStore } from '../../../core/store/basket.store'; 

@Component({
    selector: 'basket-list',
    templateUrl: './basket-list.component.html',
    styleUrls: ['./basket-list.component.sass']
})
export class BasketListComponent implements OnInit {
    // public basketList:any = [];

    constructor(
        public basketListStore: BasketListStore
    ) { 
    }

    ngOnInit(): void {
    }

    ngAfterContentChecked(){
    }
}
