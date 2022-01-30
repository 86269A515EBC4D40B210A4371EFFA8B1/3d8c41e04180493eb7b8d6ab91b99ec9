import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <form [formGroup]="form">
        <div class="mb-3">
          <label for="email">Email</label>
          <input class="form-control" formControlName="email" id="email" autocomplete="off" />
          <app-control-errors [control]="form.get('email')!">
            <ng-template appControlError="required"> Adres e-mail jest wymagany </ng-template>

            <ng-template appControlError="minlength" let-error>
              Adres e-mail jest musi składać się minimum z {{ error.requiredLength }} znaków
            </ng-template>

            <ng-template appControlError="email"> Adres e-mail jest niepoprawny </ng-template>
          </app-control-errors>
        </div>
      </form>
    </div>
  `,
})
export class AppComponent {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });
}
