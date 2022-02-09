import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { startWith, Subscription } from 'rxjs';
import { RequiredComponent } from './errors/required.component';

const DEFAULT_ERRORS = new Map<string, Type<any>>([['required', RequiredComponent]]);

@Directive({
  selector: '[appControlErrors]',
})
export class ControlErrorsDirective {
  @Input('appControlErrors') control!: AbstractControl;

  constructor(private viewContainer: ViewContainerRef) {}

  // ngAfterViewInit() {
  //   const ref = this.viewContainerRef.createComponent(RequiredComponent);
  //   this.viewContainerRef.insert(ref.hostView);
  // }

  private activeSubscription = new Subscription();

  ngOnChanges() {
    this.activeSubscription.unsubscribe();
    this.activeSubscription = this.control.valueChanges.pipe(startWith(this.control.value)).subscribe(() => {
      const errorsToShow = this.getErrorsToShow();
    });
  }

  ngOnDestroy() {
    this.activeSubscription.unsubscribe();
  }

  private getErrorsToShow(): string[] {
    if (this.control.errors === null) {
      return [];
    }
    return Object.keys(this.control.errors).filter((key) => this);
  }

  private removeError(): void {
    this.viewContainer.clear();
  }
}
