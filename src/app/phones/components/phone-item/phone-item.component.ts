import { Component, OnInit, Input } from '@angular/core';
import { IPhone } from '../../interfaces/phone.interface';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'phone-item',
    templateUrl: './phone-item.component.html',
    styleUrls: ['./phone-item.component.sass']
})
export class PhoneItemComponent implements OnInit {
	@Input('phone') phone:IPhone;
	public imgHost = environment.hosts.img_host;

    constructor() { }

    ngOnInit(): void {
    	// console.log(this.phone);
    }

}
