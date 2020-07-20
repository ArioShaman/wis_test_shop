import { Component, OnInit } from '@angular/core';
import { WishService } from '../../core/services/wish/wish.service';
import { Router } from '@angular/router';

@Component({
    selector: 'wish-popup',
    templateUrl: './wish-popup.component.html',
    styleUrls: ['./wish-popup.component.sass']
})
export class WishPopupComponent implements OnInit {
    public isOpen: boolean = false;
    public wishList: any = [];


    constructor(
        private wish: WishService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.wish.getModalState().subscribe(
            res => {
                this.isOpen = res;
            }
        );
    }
    ngAfterContentChecked(){
        // Отсортировать по дате не нужно, так как порядок полностью совпадает по возрастанию
        let ids = this.wish.getWishList().ids
        this.wishList = ids.slice(Math.max(ids.length - 5, 0));    
    }
    
    public close(){
        this.wish.closeModal();
    }
    public redirect(){
        this.close();
        this.router.navigate(['wish-list']);
    }
}
