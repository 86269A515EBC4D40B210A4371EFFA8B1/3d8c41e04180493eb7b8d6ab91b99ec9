import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup(
    {
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.email,
      ]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl(null),
    },
    {
      validators: [passwordMatchValidator],
    },
  );
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')!;
  const repeatedPassword = control.get('repeatedPassword')!;
  if (password.value !== repeatedPassword.value) {
    return { passwordMatch: true };
  }
  return null;
}
