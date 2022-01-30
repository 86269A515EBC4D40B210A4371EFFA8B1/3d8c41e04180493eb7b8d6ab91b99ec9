import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appControlError]',
})
export class ControlErrorDirective<T = unknown> {
  @Input('appControlError') errorKey!: string;

  constructor(public template: TemplateRef<T>) {}
}
