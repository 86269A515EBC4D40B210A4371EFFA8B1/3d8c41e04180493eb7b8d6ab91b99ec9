import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ControlErrorDirective } from './control-error.directive';
import { ControlErrorsComponent } from './control-errors.component';
import { RequiredComponent } from './errors/required.component';
import { MinlengthComponent } from './errors/minlength.component';
import { EmailComponent } from './errors/email.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlErrorDirective,
    ControlErrorsComponent,
    RequiredComponent,
    MinlengthComponent,
    EmailComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
