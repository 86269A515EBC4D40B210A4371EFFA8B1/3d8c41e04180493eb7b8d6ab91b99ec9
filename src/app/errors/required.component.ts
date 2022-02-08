import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-required',
  template: `<label [for]="for" class="invalid-feedback d-block">To pole jest wymagane</label>`,
})
export class RequiredComponent {
  @Input() for?: string;
}
