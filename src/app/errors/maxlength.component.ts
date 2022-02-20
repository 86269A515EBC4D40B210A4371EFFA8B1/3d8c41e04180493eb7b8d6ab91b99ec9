import { Component, Inject } from '@angular/core';

type ErrorSchema = { requiredLength: number };

@Component({
  selector: 'app-maxlength',
  template: ` To pole musi składać się maksymalnie z {{ error.requiredLength }} znaków `,
})
export class MaxlengthComponent {
  constructor(@Inject('error') public error: ErrorSchema) {}
}
