import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlModule } from './modules/graphql/graphql/graphql.module';
//region LOCALE_ID
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';
registerLocaleData(localeEsPE, 'es-Pe');

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphqlModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-Pe" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
