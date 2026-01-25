import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';

const routes: Routes = [
  {
    path: 'role',
    loadChildren: () => import('src/app/modules/decentralization/role/role.module').then(m => m.RoleModule)
  },
  {
    path: 'permission',
    loadChildren: () => import('src/app/modules/decentralization/permission/permission.module').then(m => m.PermissionModule)
  },
  {
    path: 'assign-permission',
    component: AssignPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecentralizationRoutingModule { }
