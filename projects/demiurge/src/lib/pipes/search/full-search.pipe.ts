import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullsearch',
  standalone: true,
})
export class FullSearchPipe implements PipeTransform {
  transform(value: any[], searchValue: string): any[] {
    return (
      value.filter((x) =>
        JSON.stringify(x).toLowerCase().includes(searchValue)
      ) || []
    );
  }
}
