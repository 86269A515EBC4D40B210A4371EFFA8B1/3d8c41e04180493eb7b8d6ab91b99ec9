import {
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { filter, map, mapTo, Observable, ReplaySubject, startWith, switchMap } from 'rxjs';
import { ControlErrorDirective } from './control-error.directive';
import { ControlErrorsService } from './control-errors.service';

@Component({
  selector: 'app-control-errors',
  template: `
    <label [for]="for" class="d-block invalid-feedback">
      <ng-container #container></ng-container>
    </label>
  `,
  styles: [
    `
      label:empty {
        display: none;
      }
    `,
  ],
})
export class ControlErrorsComponent implements OnDestroy {
  @Input() for?: string;
  @Input() set control(control: AbstractControl) {
    this.control$.next(control);
  }

  @ViewChild('container', { static: true, read: ViewContainerRef }) errorContainer!: ViewContainerRef;
  @ContentChildren(ControlErrorDirective, { descendants: false }) controlErrors!: QueryList<ControlErrorDirective>;

  private contentInit$ = new ReplaySubject<void>(1);
  private control$ = new ReplaySubject<AbstractControl>(1);

  constructor(private service: ControlErrorsService, private viewContainer: ViewContainerRef) {}

  private errorSubscription = this.contentInit$
    .pipe(
      switchMap(() => this.control$),
      switchMap((control) => this.getControlChanges(control)),
      filter((control) => control.pristine === false),
      map((control) => this.getErrorKeyAndData(control)),
    )
    .subscribe((data) => {
      this.errorContainer.clear();
      if (data === null) {
        return;
      }

      const template = this.getTemplate(data[0]);
      if (template) {
        this.errorContainer.createEmbeddedView(template, { $implicit: data[1] });
        return;
      }

      if (this.service.isErrorSupported(data[0])) {
        const componentType = this.service.getErrorComponent(data[0]);
        const componentRef = this.errorContainer.createComponent(componentType);
        this.errorContainer.insert(componentRef.hostView);
        return;
      }
    });

  ngAfterContentInit() {
    this.contentInit$.next();
    this.contentInit$.complete();
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  private getTemplate(errorKey: string): TemplateRef<{ $implicit: any }> | undefined {
    const el = this.controlErrors.find((controlError) => controlError.errorKey === errorKey);
    return el ? el.template : undefined;
  }

  private getErrorKeyAndData(control: AbstractControl): [string, any] | null {
    if (control.errors === null) {
      return null;
    }
    const errorKey = Object.keys(control.errors)[0];
    const errorData = control.getError(errorKey);
    return [errorKey, errorData];
  }

  private getControlChanges(control: AbstractControl): Observable<AbstractControl> {
    return control.valueChanges.pipe(startWith(control.value), mapTo(control));
  }
}
