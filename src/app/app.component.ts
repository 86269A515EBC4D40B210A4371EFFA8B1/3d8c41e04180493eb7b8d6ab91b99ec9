import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <form [formGroup]="form">
        <div class="mb-3">
          <label for="email">E-mail</label>
          <input class="form-control" formControlName="email" id="email" autocomplete="off" />
          <app-control-errors [control]="form.get('email')!">
            <ng-template appControlError="required"> Adres e-mail jest wymagany </ng-template>

            <ng-template appControlError="minlength" let-error>
              Adres e-mail jest musi składać się minimum z {{ error.requiredLength }} znaków
            </ng-template>

            <ng-template appControlError="email"> Adres e-mail jest niepoprawny </ng-template>
          </app-control-errors>
        </div>

        <div class="mb-3">
          <label for="password">Hasło</label>
          <input class="form-control" formControlName="password" id="password" autocomplete="off" />
          <app-control-errors [control]="form.get('password')!">
            <ng-template appControlError="required"> Hasło jest wymagane </ng-template>

            <ng-template appControlError="minlength" let-error>
              Hasło musi składać się mimimum z {{ error.requiredLength }} znaków
            </ng-template>

            <ng-template appControlError="passwordAndRepeatPasswordAreTheSame">
              Wprowadzone hasła nie pasują do siebie
            </ng-template>
          </app-control-errors>
        </div>

        <div class="mb-3">
          <label for="repeatPassword">Powtórz hasło</label>
          <input class="form-control" formControlName="repeatPassword" id="repeatPassword" autocomplete="off" />
          <app-control-errors [control]="form.get('repeatPassword')!">
            <ng-template appControlError="required"> Hasło jest wymagane </ng-template>

            <ng-template appControlError="minlength" let-error>
              Hasło musi składać się mimimum z {{ error.requiredLength }} znaków
            </ng-template>

            <ng-template appControlError="passwordAndRepeatPasswordAreTheSame">
              Wprowadzone hasła nie pasują do siebie
            </ng-template>
          </app-control-errors>
        </div>

        <button class="btn btn-primary" [disabled]="!form.valid">Wyślij</button>
      </form>
    </div>
  `,
})
export class AppComponent {
  form = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    },
    { validators: [passwordAndRepeatPasswordAreTheSameValidator()] },
  );
}

function passwordAndRepeatPasswordAreTheSameValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')!;
    const repeatPassword = form.get('repeatPassword')!;

    if (password.value !== repeatPassword.value) {
      return { passwordAndRepeatPasswordAreTheSame: true };
    }

    return null;
  };
}
