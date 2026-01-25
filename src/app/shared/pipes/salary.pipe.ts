import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'textTransform',
})
@Injectable({ providedIn: 'root' }) // Đảm bảo Pipe này có thể được inject
export class TextTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    value = value.trim();
    value = value.replace(/\s+/g, '_');
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }
}
