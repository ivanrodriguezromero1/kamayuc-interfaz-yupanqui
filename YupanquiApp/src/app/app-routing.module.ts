import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './areas/areas-shared/sidenav/sidenav.component';


const routes: Routes = [

  //   { path: 'login', component: LoginComponent },
  //   {
  //     path: 'callback',
  //     component: CallbackComponent
  //   },
  //   { path: 'recuperar-clave', component: RecoverPasswordComponent },
  //   {
  //     path: 'account',
  //     children: [
  //       { path: ':id/reset-clave', component: ResetPasswordComponent},
  //     ]
  //   },
  
  {
    path: 'Rover',
    component: SidenavComponent,
    children: [
      { path: '', loadChildren: () => import('./areas/dashboard/dashboard.module').then(a => a.DashboardModule) },
      //   { path: 'ayuda', loadChildren: () => import('./areas/ayuda/ayuda.module').then(a => a.AyudaModule) },
      //{ path: 'carga-informacion', loadChildren: () => import('./areas/cargar-informacion/cargar-informacion.module').then(a => a.CargarInformacionModule) },
      // { path: '**', loadChildren: () => import('./areas/dashboard/dashboard.module').then(a => a.DashboardModule) ,redirectTo: 'inicio', pathMatch: 'full' },
      //
    ]
  },
  { path: '',   redirectTo: '/Rover', pathMatch: 'full' },
  { path: '**', redirectTo: 'Rover' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
