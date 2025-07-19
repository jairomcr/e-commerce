import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true,
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(value: string, limit: number = 15): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
