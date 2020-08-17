import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { BasketListStore } from '../../../shared/store/basket.store';
import { BasketService } from '../../../core/services/basket/basket.service';
import { BasketFormComponent } from '../../components/basket-form/basket-form.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass'],
})
export class BasketComponent implements OnInit {

  constructor(
    public basketListStore: BasketListStore,
    public dialog: MatDialog,
    private basket: BasketService,
  ) { }

  public ngOnInit(): void {
  }

  public pay(): void {
    const dialogRef = this.dialog.open(BasketFormComponent, {
      width: '700px',
      height: '700px',
    });
  }

}
