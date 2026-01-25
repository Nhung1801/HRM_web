import { TagService } from './../../../../core/services/tag.service';
import { WorkService } from './../../../../core/services/work.service';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PopupApproveComponent } from '../../popup-approve/popup-approve.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { ObjectService } from 'src/app/core/services/object.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PopupApproveModule } from '../../popup-approve/popup-approve.module';
import { RemindWorkNotificationService } from 'src/app/core/signlrs/remind-work-notification.service';

@Component({
    selector: 'app-create-work',
    templateUrl: './create-work.component.html',
    styleUrls: ['./create-work.component.css'],
    standalone: true,
    imports: [SharedModule, PopupApproveModule],
})
export class CreateWorkComponent implements OnInit {
    imageUrl: string = environment.baseApiImageUrl;
    @ViewChild(PopupApproveComponent, { static: false })
    popupApprove!: PopupApproveComponent;
    employeeSelected: any;
    employeesSearch: any;
    minuteOptions: { label: string; value: number }[] = [
        { label: '15 phút', value: 0.25 },
        { label: '30 phút', value: 0.5 },
        { label: '1 giờ', value: 1 },
        { label: '12 giờ', value: 12 },
        { label: '1 ngày', value: 24 },
        { label: '3 ngày', value: 72 },
    ];

    selectedFile: File | null = null;
    fileName: string = '';
    selectedTagVisible: boolean = false;
    tags: Array<{ name: string; color: string }> = [];

    // Danh sách thẻ đã được chọn
    selectedTags: Array<{ name: string; color: string }> = [];
    createJobVisible: boolean = false;
    date2: Date | undefined;
    items: MenuItem[];
    selectedPriority: string = 'Trung bình';
    isEditing: boolean = false; // Trạng thái chỉnh sửa
    taskName: string = ''; // Lưu tên công việc
    createLoopJobVisible: boolean = false;
    createLoopJobConfigVisible: boolean = false;
    tagSelecteds: any[] = [];
    tagForWorks: any;
    name: any;
    color: any;
    createWorkForm: any;
    userCurrent: any;
    employees: any;
    selectedMinuteOption: any;
    createReminderVisible: boolean = false;
    employeeImage: any;
    selectedAvatarUrl: any;
    projectId: number | null = null;
    @Input() isVisible: boolean = false; // Quản lý trạng thái dialog
    @Output() isVisibleChange = new EventEmitter<boolean>();

    //Nhắc nhở
    remindWorkType1: any;
    remindWorkType2: any;
    remindWorkType: any;
    timeRemindStart: any;
    timeRemindEnd: any;

    ///Khoa
    visible1: boolean = false;
    position: string = '';
    searchText: string = '';
    filteredListheaderTable = [];
    listable: any[] = [];

    // khoa checklisst, thêm công việc con, phê duyệt
    checklist: any[] = [];
    openChecklist: boolean = false;
    listjobitem: any[] = [];
    openInputCreate: boolean = false;
    listStatusJobItem: any;
    visibleDialogs: boolean[] = [];
    // popupApprove: boolean = false;

    // Trạng thái hiển thị input thêm checklist

    // Giá trị input mới
    newChecklistItem: string = '';
    testUser: any;
    //

    listApprove: any[] = [];

    openDialog() {
        this.isVisible = true;
        this.isVisibleChange.emit(this.isVisible); // Thông báo thay đổi trạng thái
    }
    closeDialog() {
        this.isVisible = false;
        this.isVisibleChange.emit(this.isVisible); // Thông báo thay đổi trạng thái
    }

    userOptions: any[] = [
        { label: 'Nguyễn Văn A', value: 'nguyen_van_a' },
        { label: 'Trần Thị B', value: 'tran_thi_b' },
        { label: 'Phạm Văn C', value: 'pham_van_c' },
    ];

    completionOptions: any[] = [
        { label: 'Chưa bắt đầu | 0%', value: 0 },
        { label: 'Đang thực hiện | 25%', value: 25 },
        { label: 'Hoàn thành một nửa | 50%', value: 50 },
        { label: 'Gần hoàn thành | 75%', value: 75 },
        { label: 'Hoàn thành | 100%', value: 100 },
    ];

    constructor(
        private workService: WorkService,
        private remindWorkNotificationService: RemindWorkNotificationService,
        private tagService: TagService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private objectService: ObjectService,
        private route: ActivatedRoute
    ) {
        this.createWorkForm = {
            reporterId: null,
            projectId: null,
            executorId: null,
            groupWorkId: null,
            workPriority: null,
            name: null,
            description: null,
            startTime: null,
            dueDate: null,
            isPin: null,
            filePath: null,
            tagWorks: null,
            checkLists: null,
            approvals: null,
            remindWork: null,
            subWorks: null,
        };

        this.authService.userCurrent.subscribe((results) => {
            this.userCurrent = results;
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const projectIdStr = params.get('projectId');
            if (projectIdStr) {
                this.projectId = +projectIdStr;
            } else {
                console.error('projectId is null or undefined');
            }
        });
        this.loadTag();
        this.loadEmployees();
    }

    save(severity: string) {}

    selectPriority(priority: string): void {
        this.selectedPriority = priority;
        // this.isPopupVisible = false;
    }

    getPriorityClass(): string {
        if (this.selectedPriority === 'Cao') {
            return 'priority-high';
        } else if (this.selectedPriority === 'Trung bình') {
            return 'priority-medium';
        } else {
            return 'priority-low';
        }
    }

    enableEdit(message: string): void {
        // Bật chế độ chỉnh sửa
        this.isEditing = true;
        this.taskName = message; // Gán giá trị ban đầu của taskName
    }

    saveTaskName(): void {
        // Chỉ lưu khi đang ở chế độ chỉnh sửa
        if (!this.isEditing) {
            return;
        }

        // Kiểm tra xem taskName có thực sự thay đổi hay không
        if (this.taskName.trim() === '') {
            this.taskName = ''; // Nếu không có tên công việc, reset về rỗng
        }

        // Tắt chế độ chỉnh sửa khi lưu xong
        this.isEditing = false;
    }

    addTag() {
        this.tags.push({ name: '', color: '#000000' });
    }

    // Lưu thẻ từ danh sách nhập liệu vào danh sách đã chọn
    saveTag() {
        this.tagService
            .create({
                name: this.name,
                color: this.color,
            })
            .subscribe((results) => {
                this.name = null;
                this.loadTag();
            });
    }

    loadTag() {
        this.tagService.getPaging({}).subscribe((results) => {
            this.tags = results.data.items;
        });
    }

    deleteTag(index: any): void {
        // Hiển thị thông báo xác nhận (nếu cần)
        if (confirm('Bạn có chắc chắn muốn xóa thẻ này?')) {
            this.tagService.delete(index.id).subscribe((results) => {
                this.loadTag();
            });
        }
    }

    onTagChange(selectedTag: any): void {
        if (selectedTag.checked) {
            this.tagSelecteds.push(selectedTag); // Thêm vào mảng

            console.log(this.tagSelecteds);
        } else {
            this.tagSelecteds = this.tagSelecteds.filter(
                (tag) => tag.name !== selectedTag.name
            ); // Loại bỏ khỏi mảng
        }
    }

    applyTagForWork() {
        this.tagForWorks = this.tagSelecteds;
        this.selectedTagVisible = false;
    }

    loadEmployees() {
        this.objectService.getAllEmployee({}).subscribe((results) => {
            this.employees = results.items.map((employee: any) => ({
                ...employee, // Giữ nguyên các thuộc tính cũ
                name: `${employee.lastName} ${employee.firstName}`, // Thêm thuộc tính name
            }));
        });
    }
    onListApproveChange(updatedList: any[]) {
        // Cập nhật lại dữ liệu trong component cha
        this.listApprove = updatedList;
    }

    // Kích hoạt input file khi người dùng click vào div
    triggerFileInput() {
        const fileInput = document.getElementById(
            'fileDinhKem'
        ) as HTMLInputElement;
        if (fileInput) {
        }
    }

    // Xử lý khi người dùng chọn tệp
    onFileChange(event: any) {
        const file = event.target.files[0]; // Lấy tệp đầu tiên (nếu có)
        if (file) {
            this.selectedFile = file; // Lưu tệp vào biến selectedFile
            this.fileName = file.name; // Lưu tên tệp vào fileName
        } else {
            console.log('Không có tệp nào được chọn.');
        }
    }
    onExecutorChange(event: any) {
        this.employeeImage = event.value.avatarUrl;
        this.employeeSelected = event.value;
    }

    // khoa open checklist
    toggleChecklist() {
        this.openChecklist = !this.openChecklist;
    }
    openApproveDialog() {
        this.popupApprove.showDialogKhoa();
    }
    openDialogcheckKhoa() {
        this.popupApprove.BlogDescriptionCheckKhoa();
    }
    //
    isDropdownVisible: boolean = false;
    toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible; // Lật giá trị biến khi click vào icon
    }

    // Thêm checklist mới
    addChecklistItem() {
        if (this.newChecklistItem.trim()) {
            this.checklist.push({
                name: this.newChecklistItem,
                selected: false,
            });
            this.newChecklistItem = ''; // Reset input sau khi thêm
            this.openChecklist = false; // Ẩn input sau khi thêm
        }
    }

    newJobName = '';

    // Toggle mở/đóng input thêm công việc
    toggleOpenCreateJob() {
        this.openInputCreate = !this.openInputCreate;
    }

    // Thêm công việc con mới
    addNewJob() {
        if (this.newJobName.trim()) {
            this.listjobitem.push({
                name: this.newJobName,
                completed: false,
                assignedUsers: null,
                startDate: null,
                endDate: null,
            });
            this.newJobName = ''; // Reset input
            this.openInputCreate = false; // Đóng input sau khi thêm
        }
    }

    // Đánh dấu hoàn thành công việc
    toggleJobCompletion(job: any) {
        job.completed = !job.completed;
    }

    // Cập nhật nhân viên được gán
    updateAssignedUsers(job: any, users: any) {
        job.assignedUsers = users;
    }

    // Cập nhật ngày bắt đầu và kết thúc

    searchEmployee(event) {
        this.objectService
            .getAllEmployee({ keyWord: event.query })
            .subscribe((result: any) => {
                this.employeesSearch = result.items.map((item: any) => ({
                    ...item,
                    name: `${item.lastName} ${item.firstName}`,
                }));
            });
    }

    handleCreateWork() {
        if (this.createWorkForm.invalid) {
            console.warn('Form is invalid. Please check all fields.');
            return;
        }
        //Xử lí râu ria
        if (this.remindWorkType1 == true && this.remindWorkType1 == false) {
            this.remindWorkType = 1;
        }

        if (this.remindWorkType1 == false && this.remindWorkType1 == true) {
            this.remindWorkType = 2;
        }

        if (this.remindWorkType1 == true && this.remindWorkType1 == true) {
            this.remindWorkType = 3;
        }
        const tagWorks = this.tagForWorks?.map((item) => ({
            tagId: item.id,
        }));

        const checkListForm = this.checklist?.map((item) => ({
            name: item.name,
            isDone: item.selected,
        }));

        const subTaskForm = this.listjobitem?.map((item) => ({
            name: item.name,
            assignEmployeeId: item.assignedUsers?.id,
            startDate: item.startDate,
            dueDate: item.startDate,
            isFinish: false,
        }));

        const approvals = this.listApprove?.map((item) => {
            const ids = item.employeeApproves?.map((item) => ({
                employeeId: item.id,
            }));
            return {
                approveDate: item.dates || new Date().toISOString(), // Nếu không có ngày, lấy ngày hiện tại
                fileUrl: item.file || 'string', // Nếu không có file, đặt mặc định
                description: item.description || 'string', // Nếu không có mô tả, đặt mặc định
                isApprove: false, // Sử dụng giá trị từ `item.isApprove` hoặc mặc định là `true`
                rejectReason: item.rejectReason || '', // Nếu không có lý do từ chối, đặt mặc định
                createApprovalEmployeeRequests: ids,
            };
        });
        //Payload
        const formData = {
            reporterId: this.userCurrent?.id,
            executorId: this.employeeSelected?.id,
            projectId: this.projectId,
            groupWorkId: 1,
            workPiority:
                this.selectedPriority === 'Cao'
                    ? 0
                    : this.selectedPriority === 'Trung bình'
                    ? 1
                    : this.selectedPriority === 'Thấp'
                    ? 2
                    : null, // Giá trị mặc định nếu không khớp,
            name: this.createWorkForm?.name,
            description: 'string',
            startTime: new Date(this.createWorkForm.startTime).toISOString(),
            dueDate: this.createWorkForm.dueDate
                ? new Date(this.createWorkForm.dueDate).toISOString()
                : null,
            isPin: true,
            tagWorks: tagWorks,
            checkLists: checkListForm,
            approvals: approvals,
            remindWork: {
                remindWorkType: this.remindWorkType,
                timeRemindStart: this.timeRemindStart?.value,
                timeRemindEnd: this.timeRemindEnd?.value,
            },
            subWorks: subTaskForm,
        };

        // Call API
        this.workService.create(formData).subscribe({
            next: (response) => {
                // this.remindWorkNotificationService.ReceiveWorkNotification(
                //     (activity) => {
                //         console.log('Notification received:', activity);
                //     }
                // );
            },
            error: (error) => {
                console.error('Error creating work:', error);
            },
        });
    }
}
