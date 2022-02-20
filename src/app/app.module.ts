import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RequiredComponent } from './errors/required.component';
import { MinlengthComponent } from './errors/minlength.component';
import { EmailComponent } from './errors/email.component';
import { ControlErrorsComponent } from './control-errors.component';
import { ControlErrorDirective } from './control-error.directive';

@NgModule({
  declarations: [
    AppComponent,
    RequiredComponent,
    MinlengthComponent,
    EmailComponent,
    ControlErrorsComponent,
    ControlErrorDirective,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
