import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-errors',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class ControlErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() for?: string;
}
