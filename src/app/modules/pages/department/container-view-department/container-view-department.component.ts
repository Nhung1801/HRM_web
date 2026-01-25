import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateProjectComponent } from '../../project/create-project/create-project.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-container-view-department',
	standalone: true,
	imports: [
		ButtonModule,
		CreateProjectComponent,

	],
	templateUrl: './container-view-department.component.html',
	styleUrl: './container-view-department.component.scss'
})
export class ContainerViewDepartmentComponent implements OnInit {

	//var
	departmentId: any = null;
	constructor(private route: ActivatedRoute) {

	}


	@ViewChild(CreateProjectComponent) createProjectComponent!: CreateProjectComponent

	ngOnInit(): void {

		this.route.paramMap.subscribe(params => {
			this.departmentId = params.get('id');
		});
	}




}
