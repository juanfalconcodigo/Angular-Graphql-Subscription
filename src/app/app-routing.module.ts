import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './services/guard/auth-guard.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuardGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
