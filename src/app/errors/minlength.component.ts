import { Component, Input, Optional } from '@angular/core';
import { ControlErrorsDirective } from '../control-errors.directive';

@Component({
  selector: 'app-minlength',
  template: `
    <label [for]="for" class="invalid-feedback d-block">
      To pole musi składać się minimum z {{ error.requiredLength }} znaków
    </label>
  `,
})
export class MinlengthComponent {
  @Input() error!: { requiredLength: number };
  @Input('for') forFromInput?: string;

  get for(): string | undefined {
    return this.forFromInput ?? this.container?.for;
  }

  constructor(@Optional() private container: ControlErrorsDirective | null) {}
}
