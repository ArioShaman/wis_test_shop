import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { Subject, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GuestUserStore } from '../../../shared/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { BasketService } from '../../../core/services/basket/basket.service';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'basket-form',
  templateUrl: './basket-form.component.html',
  styleUrls: ['./basket-form.component.sass'],
})
export class BasketFormComponent implements OnInit, OnDestroy {

  @ViewChild('orderForm', { static: false }) public orderForm: NgForm;

  public price = 0.00;
  public formData = new Order('', '', '', '', '');

  public phonePattern = '[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
  public emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}';

  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<BasketFormComponent>,
    private api: ApiService,
    private guestUserStore: GuestUserStore,
    private basket: BasketService,
  ) {
  }

  public ngOnInit(): void {
  }


  public onSubmit(): void {
    const formValue = this.orderForm.value;
    const guestUser = this.guestUserStore.getValue();
    const sendData = {
      guest_user_id: guestUser.id,
      formData: formValue,
    };
    this.api.post('/orders', sendData)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        (res) => {
          this.basket.createList([]);
          this.close();
        });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
