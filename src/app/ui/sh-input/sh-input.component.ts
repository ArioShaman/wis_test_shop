import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sh-input',
    templateUrl: './sh-input.component.html',
    styleUrls: ['./sh-input.component.sass']
})
export class ShInputComponent implements OnInit {
    @Output() dataChange:EventEmitter<Object> = new EventEmitter<Object>();

    @Input('data') data:string;
    @Input('field') field:string;
    @Input('placeholder') placeholder:string;
    @Input('required') required:boolean = false;
    @Input('type') type:string = 'text';
        
    constructor() { }

    ngOnInit(): void {
    }

    public dataChanged(): void {
        this.dataChange.emit(this.data);
    }

}
