import { Component, ContentChildren, Injector, Input, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { filter, mapTo, Observable, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import { ControlErrorsService } from './control-errors.service';
import { ERROR_DATA } from './error.tokens';
import { IfErrorDirective } from './if-error.directive';

@Component({
  selector: 'app-control-errors',
  template: `
    <ng-container #errorContainer></ng-container>
    <ng-content></ng-content>
  `,
  styles: [],
})
export class ControlErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() for?: string;

  @ViewChild('errorContainer', { read: ViewContainerRef, static: true }) errorContainer!: ViewContainerRef;
  @ContentChildren(IfErrorDirective, { descendants: false }) ifErrorDirectives!: QueryList<IfErrorDirective>;

  private activeSubscription = new Subscription();

  constructor(private controlErrorsService: ControlErrorsService) {}

  ngOnChanges() {
    this.activeSubscription.unsubscribe();
    this.activeSubscription = this.getControlChanges(this.control)
      .pipe(
        filter(() => this.control.pristine === false),
        tap(() => this.errorContainer.clear()),
        filter(() => this.control.errors !== null),
        switchMap(() => of(...Object.keys(this.control.errors!))),
        filter(
          (error) =>
            this.controlErrorsService.isErrorSupported(error) &&
            this.ifErrorDirectives.find((directive) => directive.errorKey === error) === undefined,
        ),
      )
      .subscribe((errorKey) => {
        const componentToCreate = this.controlErrorsService.getErrorComponent(errorKey);
        const injector = Injector.create({
          providers: [{ provide: ERROR_DATA, useValue: this.control.getError(errorKey) }],
        });
        const ref = this.errorContainer.createComponent(componentToCreate, { injector });
        this.errorContainer.insert(ref.hostView);
      });
  }

  ngOnDestroy() {
    this.activeSubscription.unsubscribe();
  }

  private getControlChanges(control: AbstractControl): Observable<any> {
    return control.valueChanges.pipe(startWith(control.value), mapTo(control));
  }
}
