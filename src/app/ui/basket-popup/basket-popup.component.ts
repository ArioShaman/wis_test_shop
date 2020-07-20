import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../core/services/basket/basket.service';
import { IPhone } from '../../core/models/phone.interface';
import { environment } from '../../../environments/environment';
import { BasketEl } from '../../core/models/basket.model';


@Component({
    selector: 'basket-popup',
    templateUrl: './basket-popup.component.html',
    styleUrls: ['./basket-popup.component.sass']
})
export class BasketPopupComponent implements OnInit {
    public isOpen: boolean = false;
    public activePhone: IPhone;
    public count: number = 1;
    public imgHost = environment.hosts.img_host;
    public curPrice:number;

    constructor(
        private basket: BasketService
    ) { }

    ngOnInit(): void {
        this.basket.getModalState().subscribe(
            res => {
                this.count = 1;
                this.isOpen = res;
                this.activePhone = this.basket.getActivePhone();
                // console.log(this.activePhone);
                this.curPrice = parseFloat(this.activePhone.price);
            }
        );
    }

    public close(){
        this.basket.closeModal();
    }

    public calculate(){
        this.curPrice =  parseFloat(this.activePhone.price) * this.count;
    }

    public increment(){
        this.count += 1;
        this.calculate();
    }


    public decrement(){
        this.count = this.count == 1 ? 1 : this.count -= 1;
        this.calculate();
    }

    public addToBasket(){
        let basketEl = {
            phone: this.activePhone,
            count: this.count
        }
        this.basket.addToBasket(basketEl);
    }

}
