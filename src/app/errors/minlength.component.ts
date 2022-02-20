import { Component } from '@angular/core';

type ErrorSchema = { requiredLength: number };

@Component({
  selector: 'app-minlength',
  template: ` To pole musi składać się minimum z {{ error.requiredLength }} znaków `,
})
export class MinlengthComponent {
  error = {} as ErrorSchema;
}
