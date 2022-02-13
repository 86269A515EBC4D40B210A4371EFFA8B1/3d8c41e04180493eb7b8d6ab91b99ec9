import { Component, Host, Inject, Input, Optional } from '@angular/core';
import { ControlErrorsComponent } from '../control-errors.component';
import { ERROR_DATA } from '../error.tokens';

type ErrorSchema = { requiredLength: number };

@Component({
  selector: 'app-minlength',
  template: `
    <label [for]="for" class="invalid-feedback d-block">
      To pole musi składać się minimum z {{ error.requiredLength }} znaków
    </label>
  `,
})
export class MinlengthComponent {
  @Input('error') errorFromInput?: ErrorSchema;
  @Input(`for`) forFromInput?: string;

  get for(): string | undefined {
    return this.container?.for || this.forFromInput;
  }

  get error(): ErrorSchema {
    return this.errorFromInput ?? this.injectedErrors ?? this.throwError();
  }

  constructor(
    @Optional() @Inject(ERROR_DATA) private injectedErrors: ErrorSchema | null,
    @Optional() @Host() private container: ControlErrorsComponent | null,
  ) {}

  private throwError(): never {
    throw new Error('Not error data prvodided');
  }
}
