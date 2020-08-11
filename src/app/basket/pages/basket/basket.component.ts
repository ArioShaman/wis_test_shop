import { Component, OnInit } from '@angular/core';

import { BasketListStore } from '../../../shared/store/basket.store';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass'],
})
export class BasketComponent implements OnInit {

  constructor(
    public basketListStore: BasketListStore,
    private basket: BasketService,
  ) { }

  public ngOnInit(): void {
  }

  public pay(): void {
    this.basket.openFormModal();
  }

}
