import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[vmFor]',
    standalone: false
})
export class VmForDirective {
  @Input('vmFor')
  set times(iterations: number) {
    for (let i = 0; i < iterations; ++i)
      this.viewContainer.createEmbeddedView(this.template, {context: null, index: i});
  }
  constructor(private template: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

}
