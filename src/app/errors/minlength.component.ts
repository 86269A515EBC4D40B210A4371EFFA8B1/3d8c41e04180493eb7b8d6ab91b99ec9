import { Component, Host, Input, Optional } from '@angular/core';
import { ControlErrorsComponent } from '../control-errors.component';

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
  @Input(`for`) forFromInput?: string;

  get for(): string | undefined {
    return this.container?.for || this.forFromInput;
  }

  constructor(@Optional() @Host() private container: ControlErrorsComponent | null) {}
}
