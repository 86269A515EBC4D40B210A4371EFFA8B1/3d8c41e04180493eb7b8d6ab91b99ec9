import { Component, Input, Optional } from '@angular/core';
import { ControlErrorsDirective } from '../control-errors.directive';

@Component({
  selector: 'app-email',
  template: ` <label [for]="for" class="invalid-feedback d-block"> Wprowadzony adres e-mail jest niepoprawny </label> `,
})
export class EmailComponent {
  @Input('for') forFromInput?: string;

  get for(): string | undefined {
    return this.forFromInput ?? this.container?.for;
  }

  constructor(@Optional() private container: ControlErrorsDirective | null) {}
}
