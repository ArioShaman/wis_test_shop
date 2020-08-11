import { Component, OnInit } from '@angular/core';

import { BasketListStore } from '../../../shared/store/basket.store';

@Component({
  selector: 'basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.sass'],
})
export class BasketListComponent implements OnInit {

  constructor(
    public basketListStore: BasketListStore,
  ) {
  }

  public ngOnInit(): void {
  }

}
