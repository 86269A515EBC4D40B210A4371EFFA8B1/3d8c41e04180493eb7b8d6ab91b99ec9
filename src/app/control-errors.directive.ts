import { Directive, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appControlErrors]',
})
export class ControlErrorsDirective {
  @Input('appControlErrors') control!: AbstractControl;
}
