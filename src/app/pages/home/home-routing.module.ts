import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'publication', loadChildren: () => import('./publication/publication.module').then((m) => m.PublicationModule) },
      { path: 'vote', loadChildren: () => import('./vote/vote.module').then((m) => m.VoteModule) },
      { path: 'createPublication', loadChildren: () => import('./post-publication/post-publication.module').then((m) => m.PostPublicationModule) },
      { path: '**', pathMatch: 'full', redirectTo: 'publication' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
