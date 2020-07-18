import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPhone } from '../../../core/models/phone.interface';
import { environment } from '../../../../environments/environment';
import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { WishService } from '../../../core/services/wish/wish.service';

@Component({
    selector: 'phone-item',
    templateUrl: './phone-item.component.html',
    styleUrls: ['./phone-item.component.sass']
})

export class PhoneItemComponent implements OnInit {
	@Input('phone') phone:IPhone;

	public imgHost = environment.hosts.img_host;
	public hoveredLike:boolean = false;
    public inWishList$:boolean = false;

    constructor(
        private wishService: WishService,

    ) { }

    ngOnInit() {
    	// console.log(this.phone);
    }
    ngAfterContentChecked(){
        this.inWishList$ = this.wishService.checkIsPhoneInWishList(this.phone.id);
    }
    public hover(){
    	this.hoveredLike = !this.hoveredLike;
    }
    public toggleIntoWishList(){
        this.inWishList$ = !this.inWishList$;
        this.wishService.toggleWishList(
            {
                phone: this.phone,
                state: this.inWishList$
            }
        );

    }

}
