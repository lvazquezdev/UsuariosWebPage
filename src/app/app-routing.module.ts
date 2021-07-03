import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(h => h.HomeModule)
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(l => l.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
