import { Component } from '@angular/core';
import { GuestUserService } from './core/services/guest-user/guest-user.service';
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    
    constructor(
        private guestUserService: GuestUserService
    ) {

    }

    ngOnInit(): void {
        console.log('app');
        // check is guest user
        this.guestUserService.returnGuestUser().subscribe(
            res => {
                console.log(res);
            }
        ); 
    }
}
