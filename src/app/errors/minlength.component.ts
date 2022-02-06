import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-minlength',
  template: ` Pole musi składać się mimimum z {{ error.requiredLength }} znaków `,
  styles: [],
})
export class MinlengthComponent {
  @Input() error!: { requiredLength: number };
}
