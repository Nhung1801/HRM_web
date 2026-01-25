import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { ContainerViewDepartmentComponent } from './container-view-department/container-view-department.component';
import { ProjectInDepartmentComponent } from './project-in-department/project-in-department.component';
import { WorkGroupListComponent } from '../work-group/work-group-list/work-group-list.component';
const routes: Routes = [
    {
        path: 'create',
        component: CreateDepartmentComponent,
    },
    {
        path: 'container-view-department/:id',
        component: ContainerViewDepartmentComponent,
    },
    {
        path: 'container-view-department/:id/project-in-department/:projectId',
        component: ProjectInDepartmentComponent,
    },
    {
        path: 'work-group-list',
        component: WorkGroupListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepartmentRoutingModule {}
