import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhone } from '../../../core/models/phone.interface';

@Component({
  selector: 'phones-list',
  templateUrl: './phones-list.component.html',
  styleUrls: ['./phones-list.component.sass']
})
export class PhonesListComponent implements OnInit {

  public phones: IPhone[] = [];
  constructor(
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.phones = this.route.snapshot.data.phones;
  }

}
