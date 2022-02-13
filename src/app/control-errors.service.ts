import { Injectable, Type } from '@angular/core';
import { EmailComponent } from './errors/email.component';
import { MinlengthComponent } from './errors/minlength.component';
import { RequiredComponent } from './errors/required.component';

@Injectable({
  providedIn: 'root',
})
export class ControlErrorsService {
  private supportedErrors = {
    required: RequiredComponent,
    email: EmailComponent,
    minlength: MinlengthComponent,
  };

  isErrorSupported(error: string): error is keyof typeof this.supportedErrors {
    return Object.keys(this.supportedErrors).includes(error);
  }

  getErrorComponent(error: keyof typeof this.supportedErrors): Type<any> {
    return this.supportedErrors[error];
  }
}
