import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 60, completeWords: boolean = false, end: string = '...'): string {
    if (value.length < 60) {
      return value;
    }
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)} ${end}`;
  }

}
