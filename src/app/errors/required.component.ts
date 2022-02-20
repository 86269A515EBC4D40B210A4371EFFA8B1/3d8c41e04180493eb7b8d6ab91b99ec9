import { Component, Host, Input, Optional } from '@angular/core';
import { ControlErrorsComponent } from '../control-errors.component';

@Component({
  selector: 'app-required',
  template: ` To pole jest wymagane`,
})
export class RequiredComponent {}
