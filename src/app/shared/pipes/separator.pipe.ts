import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seprator',
})

export class Seprator implements PipeTransform {

  constructor() {

  }

  public transform(value: string, unit: string): string {

    if (value == undefined) {
      return '';
    }
    const n = parseInt(value);

    const rx =  /(\d+)(\d{3})/;

    return String(n).replace(/^\d+/, (w) => {
      let res = w;
      while (rx.test(res)) {
        res = res.replace(rx, '$1 $2');
      }

      return res;
    });
  }

}
