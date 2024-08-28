import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';
import { LoginComponent } from './pages/public/login/login.component';

export const routes: Routes = [
  { path: '',   loadChildren: () => import('./layouts/public-layout/public-layout.routing').then(m => m.PublicLayoutRoutes)},
  { path: 'admin',
  loadChildren: () => import('./layouts/admin-layout/admin-layout.routing').then(m => m.AdminLayoutRoutes)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // { path: '404-not-found',
  //  component:NotFoundComponent
  // },
  // {
  //   path:"**",
  //   redirectTo: '404-not-found'
  // }
];
