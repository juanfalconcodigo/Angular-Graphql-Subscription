import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPublicationComponent } from './post-publication.component';


const routes: Routes = [
  {path:'',component:PostPublicationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostPublicationRoutingModule { }
