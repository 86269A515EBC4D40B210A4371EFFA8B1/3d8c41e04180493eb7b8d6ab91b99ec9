import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup(
    {
      fromAccount: new FormControl(null, [Validators.required]),
      accountBalance: new FormControl(1_500, [Validators.required]),
      recipientsName: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      recipientsAccount: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp('^[0-9]*$')),
        Validators.minLength(26),
        Validators.maxLength(26),
      ]),

      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
        Validators.pattern(new RegExp('^[a-zA-Z0-9 ]*$')),
      ]),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    },
    {
      validators: [accountBalanceValidator],
    },
  );

  send() {
    if (!this.form.valid) {
      for (const control of Object.values(this.form.controls)) {
        control.markAsDirty();
      }
      this.form.updateValueAndValidity();
      return;
    }

    alert('Success!');
  }
}

function accountBalanceValidator(control: AbstractControl): ValidationErrors | null {
  const balance = control.get('accountBalance')!.value;
  const amount = control.get('amount')!.value;
  if (amount > balance) {
    return {
      accountBalance: { amount, balance },
    };
  }
  return null;
}
