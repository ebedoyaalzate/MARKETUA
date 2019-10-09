import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  { path: 'detail/:prov/:id', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'car', loadChildren: './pages/car/car.module#CarPageModule' },
  { path: 'my-orders', loadChildren: './pages/my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
