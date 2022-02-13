import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IfErrorDirective } from './if-error.directive';
import { RequiredComponent } from './errors/required.component';
import { MinlengthComponent } from './errors/minlength.component';
import { EmailComponent } from './errors/email.component';
import { ControlErrorsComponent } from './control-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    IfErrorDirective,
    RequiredComponent,
    MinlengthComponent,
    EmailComponent,
    ControlErrorsComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
