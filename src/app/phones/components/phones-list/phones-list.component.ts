import { Component, OnInit } from '@angular/core';
import { PhonesService } from '../../services/phones.service';
import { ActivatedRoute } from "@angular/router";
import { IPhone } from '../../interfaces/phone.interface';

@Component({
    selector: 'phones-list',
    templateUrl: './phones-list.component.html',
    styleUrls: ['./phones-list.component.sass']
})
export class PhonesListComponent implements OnInit {

    public phones: IPhone[] = [];
    constructor(
        private phoneServive:PhonesService,
        private route: ActivatedRoute 
    ) { }

    ngOnInit(): void {
        this.phones = this.route.snapshot.data.phones;
        // console.log(this.phones);
    }

}
