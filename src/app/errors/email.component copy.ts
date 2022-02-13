import { Component, Host, Input, Optional } from '@angular/core';
import { ControlErrorsComponent } from '../control-errors.component';

@Component({
  selector: 'app-email',
  template: ` <label [for]="for" class="invalid-feedback d-block"> Wprowadzony adres e-mail jest niepoprawny </label> `,
})
export class EmailComponent {
  @Input(`for`) forFromInput?: string;

  get for(): string | undefined {
    return this.container?.for || this.forFromInput;
  }

  constructor(@Optional() @Host() private container: ControlErrorsComponent | null) {}
}
