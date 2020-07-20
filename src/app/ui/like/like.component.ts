import { Component, OnInit, Input } from '@angular/core';
import { IPhone } from '../../core/models/phone.interface';
import { WishService } from '../../core/services/wish/wish.service';

const DEFAULT: string = 'default';

@Component({
    selector: 'like',
    templateUrl: './like.component.html',
    styleUrls: ['./like.component.sass']
})
export class LikeComponent implements OnInit {
    @Input('phone') phone: IPhone;
    @Input('action') action: string = DEFAULT;
    public inWishList$: boolean = false;    
    public hoveredLike: boolean = false;


    constructor(
        private wishService: WishService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(){
        this.inWishList$ = this.wishService.checkIsPhoneInWishList(this.phone.id);
    }

    public hover(){
        this.hoveredLike = !this.hoveredLike;
    }

    public toggleIntoWishList(){
        console.log(this.action);
        this.inWishList$ = !this.inWishList$;
        this.wishService.toggleWishList({
            phone: this.phone,
            state: this.inWishList$
        }, this.action);

    }    
}
