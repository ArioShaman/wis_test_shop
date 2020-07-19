import { Component } from '@angular/core';
import { GuestUserService } from './core/services/guest-user/guest-user.service';
import { Store, select } from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    
    constructor(
        private guestUserService: GuestUserService,
        public translate: TranslateService
    ) {
        translate.setDefaultLang('ru');
        translate.use('ru');
    }

    ngOnInit(): void {

        this.guestUserService.checkGuestUserIsExist();
    }
}
