import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'inputHeight',
})
export class InputHeightPipe implements PipeTransform {

  transform(el: HTMLInputElement): string {
    return el ? `calc(${el.parentElement!.clientHeight}px + 2px)` : '100%';
  }

}
