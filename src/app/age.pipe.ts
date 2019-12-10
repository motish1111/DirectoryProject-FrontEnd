import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: any): number {
    const diffMs = Date.now() - new Date(value).getTime();
    return new Date(diffMs).getUTCFullYear() - 1970;
  }
}
