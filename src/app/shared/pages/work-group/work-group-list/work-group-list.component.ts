import { Component, HostListener } from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PopupComponent } from '../../popup/popup/popup.component';
import { WorkGroupService } from 'src/app/core/services/work-group.service';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-work-group-list',
    templateUrl: './work-group-list.component.html',
    styleUrl: './work-group-list.component.scss',
})
export class WorkGroupListComponent {
    color: string = '#ffffff';
    workGroups: any[] = [];
    isColorPickerVisible: boolean = false;
    isColorPickerVisiblecreate: boolean = false;
    isPopupVisible: boolean = false;
    selectedGroupIndex: number | null = null;
    selectedGroupIndexCreate: number | null = null;
    projectId: any = null;
    project: any = {};
    listworkwidthprojectid: any;
    PageIndex: number = 1;
    PageSize:number = 100000;
    constructor(
        private workgroup: WorkGroupService,
        private message: MessageService,
        private route: ActivatedRoute,
        private projectService: ProjectService
    ) {}

    ngOnInit() {
        console.log(this.workGroups);
        this.workGroups = [];
        this.route.paramMap.subscribe((params) => {
            const projectId = params.get('projectId');
            this.projectId = projectId;
            this.projectService.getById({ id: projectId }).subscribe((res) => {
                this.project = res.data;

                this.getWorkGroupByProjectID(this.project.id);
            });
        });
    }
    baseImageUrl = environment.baseApiImageUrl;
    get connectedDropLists(): string[] {
        return this.workGroups.map((_, idx) => 'group-' + idx);
    }

    addWorkGroup(): void {
        const newGroup = {
            id: this.workGroups.length + 1,
            name: '',
            color: '#ccc',
            tasks: [],
        };
        this.workGroups.push(newGroup);
    }

    deleteWorkGroup(index: number): void {
        this.workGroups.splice(index, 1);
    }

    
    drop(event: CdkDragDrop<any[]>, groupIndex: number): void {
        // Thông tin công việc được kéo
        const draggedTask = event.item.data;

        // Thông tin nhóm nguồn (cdkDropList trước đó)
        const sourceGroup = event.previousContainer;
      
        // Thông tin nhóm đích (cdkDropList hiện tại)
        const targetGroup = event.container.data;
      
        // Log thông tin chi tiết
        console.log('Dragged Task:', draggedTask);
        console.log('Source Group:', sourceGroup);
        console.log('Target Group:', targetGroup);
    
        //  viết thêm chức năng thêm vào nhóm đích và delete khỏi nhóm nguồn
        if (event.previousContainer === event.container) {
          // Di chuyển trong cùng một nhóm
          moveItemInArray(
            this.workGroups[groupIndex].tasks,
            event.previousIndex,
            event.currentIndex
          );
        } else {
          // Di chuyển giữa các nhóm
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      }
      
    toggleColorPicker(index: number) {
        this.isColorPickerVisible =
            this.selectedGroupIndex === index
                ? !this.isColorPickerVisible
                : true;
        this.selectedGroupIndex = index;
    }
    toggleColorPickercreate(index: number) {
        this.isColorPickerVisiblecreate =
            this.selectedGroupIndexCreate === index
                ? !this.isColorPickerVisiblecreate
                : true;
        this.selectedGroupIndexCreate = index;
    }

    togglePopup() {
        this.isPopupVisible = !this.isPopupVisible;
    }

    closeColorPicker() {
        this.isColorPickerVisible = false;
        this.selectedGroupIndex = null;
    }
    closeColorPickerCreate() {
        this.isColorPickerVisiblecreate = false;
        this.selectedGroupIndexCreate = null;
    }

    //  hàm thêm hoặc cập nhật nhóm công việc
    handleCreateandUpdate(
        inputValue: string,
        selectedColor: string,
        id?: number
    ) {
        const request = {
            projectId: this.project.id,
            name: inputValue,
            color: selectedColor,
        };
        if (id != undefined && id != null) {
            this.workgroup.getWorkGroupByID(id).subscribe((res) => {
                if (res.data) {
                    this.workgroup
                        .updateWorkGroup(id, request)
                        .subscribe((res) => {
                            if ((res.status = true)) {
                                this.getWorkGroupByProjectID(this.project.id);
                                this.message.add({
                                    summary: 'Thông báo',
                                    severity: 'success',
                                    detail: 'Cập nhật thành công',
                                });
                            } else {
                                this.message.add({
                                    summary: 'Thông báo',
                                    severity: 'error',
                                    detail: 'Cập nhật thất bại',
                                });
                            }
                        });
                }
            });
        }
        else{
            this.workgroup.createWorkGroup(request).subscribe((res) => {
                if ((res.status = true)) {
                    this.workGroups = [];
                    this.getWorkGroupByProjectID(this.project.id);
                    this.message.add({
                        summary: 'Thông báo',
                        detail: 'Thêm nhóm công việc thành công',
                        severity: 'success',
                    });
                } else {
                    this.message.add({
                        summary: 'Thông báo',
                        detail: 'Thêm nhóm công việc thất bại',
                        severity: 'error',
                    });
                }
            });
        }
    }
    //  lấy danh sách nhóm công việc theo dự án
    getWorkGroupByProjectID(id: number) {
        const request = {
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
            ProjectId: id
        }
        this.workgroup.getWorkGroupByProjectID(request).subscribe((res) => {
            this.listworkwidthprojectid = res.data.items;
        });
    }

    //  chuyển đổi thành màu mặc địn mếu color ko hợp lệ
    getValidColor(color: string): string {
        const s = new Option().style;
        s.color = color;
        return s.color ? color : '#ccc';
    }

    // xóa
    handleDelete(id: number) {
        this.workgroup.deleteWorkGroup(id).subscribe((res) => {
            if ((res.status = true)) {
                this.getWorkGroupByProjectID(this.project.id);
                this.message.add({
                    summary: 'Thông báo',
                    severity: 'success',
                    detail: ' Xóa thành công',
                });
            } else {
                this.message.add({
                    summary: 'Thông báo',
                    severity: 'error',
                    detail: ' Xóa thất bại',
                });
            }
        });
    }
}
