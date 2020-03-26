import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostPublicationRoutingModule } from './post-publication-routing.module';
import { PostPublicationComponent } from './post-publication.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PostPublicationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PostPublicationRoutingModule
  ]
})
export class PostPublicationModule { }
