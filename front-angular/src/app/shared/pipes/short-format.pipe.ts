import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortFormat',
    standalone: true
})
export class ShortFormatPipe implements PipeTransform {

  public transform(value: string | number): string {
    const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (numericValue >= 1000000) {
      return (numericValue / 1000000).toFixed(1) + 'M';
    } else if (numericValue >= 1000) {
      return (numericValue / 1000).toFixed(1) + 'K';
    } else {
      return numericValue.toString();
    }
  }

}
