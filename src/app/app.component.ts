import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GuestUserService } from './core/services/guest-user/guest-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {


  constructor(
      private guestUserService: GuestUserService,
      public translate: TranslateService,
  ) {
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

  public ngOnInit(): void {
    this.guestUserService.checkGuestUserIsExist();
  }

}
