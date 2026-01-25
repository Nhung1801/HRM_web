import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ObjectService } from 'src/app/core/services/object.service';
import { environment } from 'src/environments/environment';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'app-popup-approve',
    templateUrl: './popup-approve.component.html',
    styleUrls: ['./popup-approve.component.scss'],
    providers: [MessageService],
})
export class PopupApproveComponent implements OnInit {
    @Input() listApproveConnect: any[] = [];
    @Output() listApproveChange = new EventEmitter<any[]>();
    imageUrl: string = environment.baseApiImageUrl;
    visible: boolean = false;
    cities!: City[];
    openCreate: boolean = false;
    selectedCities!: City[];
    openDescriptionCheck: boolean = false;
    employees: any;

    //Nhắc nhở
    employeeApproves: any;
    selectedDates: any;
    file: any;
    description: any;
    listApproval: any[] = [];
    constructor(
        private messageService: MessageService,
        private objectService: ObjectService
    ) {}

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }

    showDialogKhoa() {
        this.visible = true;
        this.loadEmployee();
    }

    loadEmployee() {
        this.objectService.getAllEmployee({}).subscribe((results) => {
            this.employees = results.items.map((item: any) => ({
                ...item,
                name: `${item.lastName} ${item.firstName}`,
            }));
        });
    }

    onUpload(event: any) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded with Basic Mode',
        });
    }

    openDialogCreate() {
        this.openCreate = true;
    }

    BlogDescriptionCheckKhoa() {
        this.openDescriptionCheck = !this.openDescriptionCheck;
    }

    // Tạo phê duyệt mới
    createApproval() {
        const approvalData = {
            employeeApproves: this.employeeApproves,
            dates: this.selectedDates,
            file: this.file,
            description: this.description,
            isApprove: false,
        };

        // Thêm dữ liệu vào danh sách
        this.listApproval.push(approvalData);
        this.listApproveConnect = this.listApproval;
        this.listApproveChange.emit(this.listApproveConnect);
        this.employeeApproves = null; // hoặc giá trị mặc định
        this.selectedDates = null; // hoặc giá trị mặc định
        this.file = null; // hoặc giá trị mặc định
        this.description = ''; // hoặc giá trị mặc định

        // Đóng cửa sổ tạo mới
        this.openCreate = false;
    }
}
