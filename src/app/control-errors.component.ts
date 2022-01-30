import { Component, ContentChildren, Input, QueryList, TemplateRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";
import { map, mapTo, startWith, switchMap } from "rxjs/operators";
import { ControlErrorDirective } from "./control-error.directive";

@Component({
  selector: "app-control-errors",
  template: `
    <label for="email" class="invalid-feedback d-block">
      <ng-container *ngTemplateOutlet="template$ | async"></ng-container>
    </label>
  `,
})
export class ControlErrorsComponent {
  @Input() set control(control: AbstractControl) {
    this.control$.next(control);
  }

  @ContentChildren(ControlErrorDirective, { descendants: false }) controlErrors!: QueryList<ControlErrorDirective>;

  private contentInit$ = new ReplaySubject<void>(1);
  private control$ = new ReplaySubject<AbstractControl>(1);

  template$ = this.contentInit$.pipe(
    switchMap(() => this.control$),
    switchMap((control) => this.getControlChanges(control)),
    map((control) => (control.errors ? this.getFirstError(control) : null)),
    map((error) => (error ? this.getTemplate(error[0], error[1]) : null))
  );

  ngAfterContentInit() {
    this.contentInit$.next();
  }

  private getTemplate<T>(errorKey: string, errorData: T): TemplateRef<T> | null {
    const controlError = this.controlErrors.find((controlError) => controlError.errorKey === errorKey);

    if (controlError === void 0) {
      return null;
    }

    return controlError.template as TemplateRef<T>;
  }

  private getFirstError(control: AbstractControl): [string, any] {
    const errorKey = Object.keys(control.errors!)[0];
    const errorData = control.getError(errorKey);
    return [errorKey, errorData];
  }

  private getControlChanges(control: AbstractControl): Observable<AbstractControl> {
    return control.valueChanges.pipe(startWith(control.value), mapTo(control));
  }
}
