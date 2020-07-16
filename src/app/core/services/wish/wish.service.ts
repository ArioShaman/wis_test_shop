import { Injectable } from '@angular/core';
import { IPhoneWishState } from '../../../core/models/wish-state.interface';
import { IPhone } from '../../../core/models/phone.interface';

@Injectable({
    providedIn: 'root'
})
export class WishService {

    public wishList:Array<IPhone> = [];

    constructor() { }

    public toggleWishList(wishState: IPhoneWishState){
        console.log(wishState)
        if(wishState.state){
            this.addToWishList(wishState.phone);
        }else{
            this.removeFromWishList(wishState.phone);
        }
    }
    public addToWishList(phone: IPhone){
        this.wishList.push(phone);
    }

    public removeFromWishList(phone: IPhone){
        console.log('remove');
    }
}
