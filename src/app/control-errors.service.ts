import { Injectable, Type } from '@angular/core';
import { EmailComponent } from './errors/email.component';
import { MinlengthComponent } from './errors/minlength.component';
import { RequiredComponent } from './errors/required.component';

@Injectable({
  providedIn: 'root',
})
export class ControlErrorsService {
  private supportedErrors: Record<string, Type<unknown>> = {
    required: RequiredComponent,
    email: EmailComponent,
    minlength: MinlengthComponent,
  };

  isErrorSupported(error: string): boolean {
    return Object.keys(this.supportedErrors).includes(error);
  }

  getErrorComponent(error: string): Type<unknown> {
    return this.supportedErrors[error];
  }
}
