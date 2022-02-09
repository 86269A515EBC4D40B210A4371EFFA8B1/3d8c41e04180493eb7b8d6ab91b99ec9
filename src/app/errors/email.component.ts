import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email',
  template: ` <label [for]="for" class="invalid-feedback d-block"> Wprowadzony adres e-mail jest niepoprawny </label> `,
})
export class EmailComponent {
  @Input() for?: string;
}
