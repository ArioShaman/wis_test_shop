import { Component, OnInit, Input } from '@angular/core';
import { IPhone } from '../../core/models/phone.interface';
import { WishService } from '../../core/services/wish/wish.service';

@Component({
    selector: 'like',
    templateUrl: './like.component.html',
    styleUrls: ['./like.component.sass']
})
export class LikeComponent implements OnInit {
    @Input('phone') phone: IPhone;
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
        this.inWishList$ = !this.inWishList$;
        this.wishService.toggleWishList(
            {
                phone: this.phone,
                state: this.inWishList$
            }
        );

    }    
}
