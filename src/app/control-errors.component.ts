import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';
import { ControlErrorDirective } from './control-error.directive';

@Component({
  selector: 'app-control-errors',
  template: `
    <label *ngIf="templateWithContext$ | async as data" class="invalid-feedback d-block">
      <ng-container *ngTemplateOutlet="data[0]; context: data[1]"></ng-container>
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

  templateWithContext$ = this.contentInit$.pipe(
    switchMap(() => this.control$),
    tap(console.log),
    switchMap((control) => this.getControlChanges(control)),
    filter((control) => control.pristine === false),
    map((control) => this.getErrorKeyAndData(control)),
    map((error) => (error ? this.getTemplateWithContext(error[0], error[1]) : null)),
  );

  ngAfterContentInit() {
    this.contentInit$.next();
  }

  private getErrorKeyAndData(control: AbstractControl): [string, any] | null {
    if (control.errors === null) {
      return control.parent ? this.getErrorKeyAndData(control.parent) : null;
    }
    const errorKey = Object.keys(control.errors)[0];
    const errorData = control.getError(errorKey);
    return [errorKey, errorData];
  }

  private getTemplateWithContext<T>(errorKey: string, errorData: T): [TemplateRef<T>, { $implicit: T }] | null {
    const controlError = this.controlErrors.find((controlError) => controlError.errorKey === errorKey);

    if (controlError === void 0) {
      return null;
    }

    return [controlError.template as TemplateRef<T>, { $implicit: errorData }];
  }

  private getControlChanges(control: AbstractControl): Observable<AbstractControl> {
    const root = control.root ?? control;
    return root.valueChanges.pipe(startWith(control.value), mapTo(control));
  }
}
