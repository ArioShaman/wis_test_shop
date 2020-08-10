import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sh-input',
  templateUrl: './sh-input.component.html',
  styleUrls: ['./sh-input.component.sass'],
})
export class ShInputComponent implements OnInit {

  @Output() public dataChange: EventEmitter<Object> = new EventEmitter<Object>();

  @Input('data') public data: string;
  @Input('field') public field: string;
  @Input('placeholder') public placeholder: string;
  @Input('required') public required: boolean = false;
  @Input('type') public type: string = 'text';

  constructor() { }

  public ngOnInit(): void {
  }

  public dataChanged(): void {
    this.dataChange.emit(this.data);
  }

}
