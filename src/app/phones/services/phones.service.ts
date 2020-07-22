import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Observable } from "rxjs";
import {IPhone } from '../../core/models/phone.interface';

@Injectable({
    providedIn: 'root'
})
export class PhonesService {

    constructor(
        private api: ApiService,
    ) { 
    }

    public getPhones(): Observable<IPhone[]>{
        return this.api.get('/phones')
    }
}
