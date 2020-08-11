import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    Validators,
    FormGroup,
    FormArray,
    FormArrayName,
    FormGroupName,
} from '@angular/forms';

import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GuestUserStore } from '../../../shared/store/guest-user.store';
import { ApiService } from '../../../core/services/api/api.service';
import { BasketService } from '../../../core/services/basket/basket.service';


@Component({
  selector: 'basket-form',
  templateUrl: './basket-form.component.html',
  styleUrls: ['./basket-form.component.sass'],
})
export class BasketFormComponent implements OnInit, OnDestroy {

  public orderForm: FormGroup;
  public isOpenedForm: boolean = false;
  public price = 0.00;

  private destroyOrderFlow$: Subject<void> = new Subject<void>();
  private destroyModalStateFlow$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private basket: BasketService,
    private guestUserStore: GuestUserStore,
  ) {
    this.orderForm = this.fb.group({
      full_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      comment: [''],
    });
  }

  public ngOnInit(): void {
    this.basket.getFormModalState().pipe(
      takeUntil(this.destroyModalStateFlow$)).subscribe(
      (res) => {
        this.isOpenedForm = res;
        this.price = this.basket.getOnceItemsPrice();
      });
  }

  public onSubmit(cf: Object): void {
    const guestUser = this.guestUserStore.getValue();
    const sendData = {
      guest_user_id: guestUser.id,
      formData: cf,
    };

    this.api.post('/orders', sendData).pipe(
      takeUntil(this.destroyOrderFlow$)).subscribe(
      (res) => {
        if (!res['error']) {
          this.basket.createList([]);
          this.close();
        }
      });
  }
  public close(): void {
    this.orderForm.reset();
    this.basket.closeFormModal();
  }
  public ngOnDestroy(): void {
    this.destroyOrderFlow$.next();
    this.destroyModalStateFlow$.next();

    this.destroyOrderFlow$.complete();
    this.destroyModalStateFlow$.complete();
  }

}
