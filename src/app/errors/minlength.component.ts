import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minlength',
  template: `<label [for]="for">To pole musi składać się minimum z {{ error.requiredLength }} znaków</label>`,
})
export class MinlengthComponent {
  @Input() for?: string;
  @Input() error!: { requiredLength: number };
}