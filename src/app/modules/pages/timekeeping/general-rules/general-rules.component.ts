import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';
import { PermissionConstant } from 'src/app/core/constants/permission-constant';
import { HasPermissionHelper } from 'src/app/core/helpers/has-permission.helper';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { TimekeepingService } from 'src/app/core/services/TimekeepingRegulation.service';
import { UserService } from './../../../../core/services/identity/user.service';
import { AuthService } from './../../../../core/services/identity/auth.service';

@Component({
    selector: 'app-general-rules',
    templateUrl: './general-rules.component.html',
    styleUrl: './general-rules.component.scss',
})
export class GeneralRulesComponent {
    listSelected: any;
    organizationId: number;
    selectedOption: boolean;
    selectedCategory: any = null;
    chekboxRadio: number | null = null;
    listSelectTask: any[] = [
        { label: 'Tính theo giờ thực tế', value: 0 },
        { label: 'Tính nửa công', value: 1 },
    ];
    idkeeping: number;
    constructor(
        private fb: FormBuilder,
        private keepingSevice: TimekeepingService,
        private company: CompanyInfoService,
        private message: MessageService,
        public permisionHelper: HasPermissionHelper,
        private AuthService: AuthService
    ) {}
    permissionConstant = PermissionConstant;
    ngOnInit() {
        this.listSelected = [
            {
                label: 'Cho phép nhân viên đăng lý',
                value: 1,
            },
            {
                label: 'Cho phép nhân viên theo dõi bảng chấm công chi tiết hàng ngày',
                value: 2,
            },
            {
                label: 'Cho phép nhân viên theo dõi thời gian làm việc trên bảng chấm công, lịch phân ca',
                value: 3,
            },
            {
                label: 'Cho phép nhân viên chấm công ngoài khung giờ chấm công của ca',
                value: 4,
            },
            {
                label: 'Phân ca, chấm công theo địa điểm làm việc',
                value: 5,
            },
        ];
        this.organizationId = this.AuthService.getUserCurrent().organization.id;

        this.handleGetbyId();
    }
    handleGetbyId() {
        // this.company.getCompanyById(1).subscribe((res) => {
        //     this.keepingSevice.getOraganiID(res.data.id).subscribe((res) => {
        //         this.idkeeping = res.data.organizationId;
        //         this.chekboxRadio = res.data.partTimePayrollType;
        //     });
        // });
        let organizationId = this.organizationId;
        this.keepingSevice.getOraganiID(organizationId).subscribe((res) => {
            this.idkeeping = organizationId;
            this.chekboxRadio = res.data.partTimePayrollType;
        });
    }
    handleUpdate() {
        let organizationId = this.organizationId;

        const request = {
            organizationId: organizationId,
            partTimePayrollType: this.chekboxRadio,
        };
        const status = this.keepingSevice
            .updateTimeKeepig(request)
            .subscribe((res) => {});
        if (status) {
            this.message.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: 'Cật nhật thành công',
            });
        } else {
            this.message.add({
                severity: 'warning',
                summary: 'Thông báo  ',
                detail: 'Cật nhật thất bại',
            });
        }
    }
}
