import { Component, Host, Input, Optional } from '@angular/core';
import { ControlErrorsComponent } from '../control-errors.component';

@Component({
  selector: 'app-required',
  template: ` <label [for]="for" class="invalid-feedback d-block"> To pole jest wymagane </label> `,
})
export class RequiredComponent {
  @Input(`for`) forFromInput?: string;

  get for(): string | undefined {
    return this.container?.for || this.forFromInput;
  }

  constructor(@Optional() @Host() private container: ControlErrorsComponent | null) {}
}
