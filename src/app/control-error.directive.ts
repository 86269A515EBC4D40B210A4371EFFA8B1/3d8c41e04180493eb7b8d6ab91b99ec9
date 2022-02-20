import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appControlError]',
})
export class ControlErrorDirective {
  @Input('appControlError') errorKey!: string;

  constructor(public template: TemplateRef<{ $implicit: any }>) {}
}
