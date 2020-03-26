import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,

  ],
  imports: [
    HomeRoutingModule,
  ]
})
export class HomeModule { }
