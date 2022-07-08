import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'contentFilter'
})
export class ContentFilterPipe implements PipeTransform {

  public transform(content: string[], viewLength: number, pointer: number): string[] {
    // if (pointer < content.length - pointer)
    return null;
  }

}
