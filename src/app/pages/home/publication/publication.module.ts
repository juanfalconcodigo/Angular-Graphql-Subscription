import { NgModule } from '@angular/core';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationComponent } from './publication.component';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@NgModule({
  declarations: [
    PublicationComponent,
    TruncatePipe,
  ],
  imports: [
    PublicationRoutingModule,
    CommonModule
  ]
})
export class PublicationModule { }
