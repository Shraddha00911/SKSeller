import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { UploadcfrarticlesComponent } from './uploadcfr/uploadcfrarticles/uploadcfrarticles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-pages/login',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'uploadcfr', component: UploadcfrarticlesComponent, canActivate: [AuthGuard] },
  { path: 'itemscheme', loadChildren: () => import('./itemscheme/item-scheme.module').then(m => m.ItemSchemeModule), canActivate: [AuthGuard] },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule), canActivate: [AuthGuard] },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  //  RouterModule.forRoot(routes)
  exports: [RouterModule]
})
export class AppRoutingModule { }
