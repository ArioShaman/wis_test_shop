import { Component, OnInit } from '@angular/core';
import { 
    FormBuilder, 
    FormControl, 
    Validators, 
    FormGroup, 
    FormArray, 
    FormArrayName, 
    FormGroupName 
} from '@angular/forms';

import { GuestUserStore } from '../../../core/store/guest-user.store';

import { ApiService } from '../../../core/services/api/api.service';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
    selector: 'basket-form',
    templateUrl: './basket-form.component.html',
    styleUrls: ['./basket-form.component.sass']
})
export class BasketFormComponent implements OnInit {
    public orderForm: FormGroup;
    public isOpenedForm:boolean = false;
    public price = 0.00;

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private basket: BasketService,
        private guestUserStore: GuestUserStore
    ) { 
        this.orderForm = this.fb.group({
            'full_name': ['', Validators.required],
            'phone': ['', Validators.required],
            'email': ['', Validators.required],
            'address': ['', Validators.required],
            'comment': ['']            
        })
    }

    ngOnInit(): void {
        this.basket.getFormModalState().subscribe(
            res =>{
                this.isOpenedForm = res;
                this.price = this.basket.getOnceItemsPrice();
            }
        );
    }

    public onSubmit(cf): void {
        let guestUser = this.guestUserStore.getValue();
        let sendData = {
            guest_user_id: guestUser.id,
            formData: cf
        }
        console.log(sendData);
        this.api.post('/orders', sendData).subscribe(
            res => {
                console.log(res);
                if(!res['error']){
                    this.basket.createList([]);
                    this.close();
                }
            }
        );
    }
    public close(): void {
        this.orderForm.reset();
        this.basket.closeFormModal();
    }
}
