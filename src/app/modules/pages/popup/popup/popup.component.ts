import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PopupApproveComponent } from '../../popup-approve/popup-approve.component';
@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
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
    createLoopJobConfigVisible: boolean = true;
    // khoa checklisst, thêm công việc con, phê duyệt
    checklist: any;
    openChecklist: boolean = false;
    listjobitem: any;
    openInputCreate: boolean = false;
    listStatusJobItem: any;
    visibleDialogs: boolean[] = [];
    testUser: any;
    //
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
    @ViewChild(PopupApproveComponent, { static: false })
    popupApprove!: PopupApproveComponent;
    constructor() {
        this.items = [
            {
                label: 'Update',
                command: () => {},
            },
            {
                label: 'Delete',
                command: () => {},
            },
            { label: 'Angular Website', url: 'http://angular.io' },
            { separator: true },
            { label: 'Upload', routerLink: ['/fileupload'] },
        ];
    }

    ngOnInit() {
        // khoa test checklist
        // test list checklist
        this.checklist = [
            {
                name: 'vẽ sơ đồ',
            },
            {
                name: 'Thống nhất ký kiến',
            },
        ];
        // test list job con
        this.listjobitem = [
            {
                name: 'fe-thiết kế giao diện  ',
            },
            {
                name: 'be-thiết kế giao diện ',
            },
            {
                name: 'Tích hợp-thiết kế giao diện ',
            },
            {
                name: 'test-thiết kế giao diện ',
            },
        ];
        this.listStatusJobItem = [
            {
                name: 'In Process',
            },
            {
                name: 'In Testing ',
            },
            {
                name: 'Done',
            },
            {
                name: 'Ready to test ',
            },
        ];
        this.visibleDialogs = [false, false];
        this.testUser = [
            {
                name: 'Nguyễn Văn A',
            },
            {
                name: 'Trần Thị B',
            },
            {
                name: 'Phạm Văn C',
            },
        ];
        ///
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
    saveTag(index: number) {
        const tag = this.tags[index];
        if (tag.name.trim()) {
            this.selectedTags.push({ ...tag });
            this.tags.splice(index, 1); // Xóa thẻ khỏi danh sách nhập liệu
        } else {
            alert('Vui lòng nhập tên thẻ trước khi lưu.');
        }
    }

    deleteTag(index: number): void {
        // Hiển thị thông báo xác nhận (nếu cần)
        if (confirm('Bạn có chắc chắn muốn xóa thẻ này?')) {
            this.selectedTags.splice(index, 1); // Xóa thẻ khỏi danh sách
            console.log('Thẻ đã được xóa:', this.selectedTags);
        }
    }
    // khoa open checklist
    toggleChecklist() {
        this.openChecklist = !this.openChecklist;
    }
    toggleOpenCreateJob() {
        this.openInputCreate = !this.openInputCreate;
    }
    // openApproveDialog() {
    //     this.popupApprove.showDialog();
    // }
    // openDialogcheck() {
    //     this.popupApprove.BlogDescriptionCheck();
    // }
    //
    isDropdownVisible: boolean = false;
    toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible; // Lật giá trị biến khi click vào icon
    }
    visible1: boolean = false;
    position: string = '';
    searchText: string = '';
    filteredListheaderTable = [];
    listable: any[] = [];
    openDialog(position: string) {
        this.position = position;

        this.filteredListheaderTable = this.testUser.map((item) => {
            const storedItem = this.listable.find(
                (listableItem) => listableItem.name === item.name
            );
            return {
                ...item,
                status: storedItem ? storedItem.status : item.status,
            };
        });

        this.visible1 = true;
        this.searchText = '';
    }
}
