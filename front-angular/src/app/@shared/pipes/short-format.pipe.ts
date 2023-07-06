import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortFormat'
})
export class ShortFormatPipe implements PipeTransform {

  transform(value: string): string {
    const numericValue = parseInt(value, 10);

    if (numericValue >= 1000000) {
      return (numericValue / 1000000).toFixed(1) + 'M';
    } else if (numericValue >= 1000) {
      return (numericValue / 1000).toFixed(1) + 'K';
    } else {
      return numericValue.toString();
    }
  }

}
