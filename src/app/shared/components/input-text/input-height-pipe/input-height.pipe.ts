import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'inputHeight',
})
export class InputHeightPipe implements PipeTransform {

  transform(height: number): string {
    return !Number.isNaN(+height) ? `calc(${height}px + 2px)` : '100%';
  }

}
