import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteRoutingModule } from './vote-routing.module';
import { VoteComponent } from './vote.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    VoteComponent
  ],
  imports: [
    CommonModule,
    VoteRoutingModule,
    ChartsModule
  ]
})
export class VoteModule { }
