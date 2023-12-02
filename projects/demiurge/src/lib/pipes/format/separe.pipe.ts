import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separe',
  standalone: true,
})
export class DemiSeparePipe implements PipeTransform {
  transform(value: string[] | undefined, separator: string = ', '): string {
    if (!value) return '';
    if (value.length === 0) return '';

    let response: string = '';
    value.forEach((chain: string, indx: number) => {
      response = response.concat(chain);
      if (indx < value.length - 1) response = response.concat(separator);
    });

    return response;
  }
}
