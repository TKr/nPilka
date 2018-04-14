import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FieldComponent } from './components/field.component';
import { SectorComponent } from './components/sector.component';
import { BallComponent } from './components/ball.component';


@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    SectorComponent,
    BallComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
