import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { WorkGroupListModule } from '../../work-group/work-group-list/work-group-list.module';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { UpdateProjectComponent } from '../../project/update-project/update-project.component';

@Component({
	selector: 'app-project-in-department',
	standalone: true,
	imports: [
		ButtonModule,
		SidebarModule,
		WorkGroupListModule,
		UpdateProjectComponent
	],
	templateUrl: './project-in-department.component.html',
	styleUrl: './project-in-department.component.scss'
})
export class ProjectInDepartmentComponent implements OnInit {
    projectId: any = null;
    project: any = {};
    createJobVisible: boolean = false;
    // constructor(
    //     private route: ActivatedRoute,
    //     private projectService: ProjectService
    // ) {}

	// projectId: any = null;
	// project: any = {};

	@ViewChild(UpdateProjectComponent) updateProjectComponent!:UpdateProjectComponent
	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectService

	) { }
	
	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const projectId = params.get('projectId');
			this.projectId = projectId;
			this.projectService.getById({ id: projectId }).subscribe(res => {
				this.project = res.data;
			})
		});
	}

    openJobDialog() {
        this.createJobVisible = true;
    }
}
