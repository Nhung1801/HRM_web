import { PayrollService } from './../../../../core/services/payroll.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import pagingConfig, {
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE_OPTIONS,
    DEFAULT_PER_PAGE_OPTIONS,
} from 'src/app/core/configs/paging.config';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { StaffPositionService } from 'src/app/core/services/staff-position.service';
import { SummaryTimesheetService } from './../../../../core/services/summary-timesheet.service';
import { TreeNode, MessageService } from 'primeng/api';
import { TimeSheetService } from 'src/app/core/services/time-sheet.service';
import { StaffDetailService } from 'src/app/core/services/staff-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import systemConfig from 'src/app/core/configs/system.config';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
    @Output() onCreated = new EventEmitter<void>();
    items: any = [];
    displayDialog: any = false;
    messages: any[] = [];
    salaryForm: FormGroup;
    treeData: any = [];
    queryParameters: any = {};

    organizationId: any;
    salaryTableNameStaffPositions: any = [];
    getPayrolls!: () => void;
    paging: any = {
        pageIndex: DEFAULT_PAGE_INDEX,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy: '',
        orderBy: '',
        totalRecords: 0,
        totalPages: 0,
    };
    staffPosition: any = [];
    staffPositionIds: any = [];
    summaryTimesheets: any[] = [];
    selectedSummaryTimesheets: any[] = [];

    timeSheetDetail: any[] = [];

    config: any = {
        paging: pagingConfig.default,
        baseUrl: systemConfig.baseFileSystemUrl,
        perPageOptions: DEFAULT_PER_PAGE_OPTIONS,
        pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
    };
    constructor(
        private fb: FormBuilder,
        private organizationService: OrganizationService,
        private staffPositionService: StaffPositionService,
        private summaryTimesheetService: SummaryTimesheetService,
        private staffDetailService: StaffDetailService,
        private payrollService: PayrollService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService
    ) {
        this.salaryForm = this.fb.group(
            {
                organizationId: [null, Validators.required],
                staffPositionId: [null],
                summaryTableName: [null, Validators.required],
                salaryTableNameStaffPositions: [null, Validators.required],
            },
            {}
        );
    }

    ngOnInit(): void {
        this.items = [{ label: 'Thêm bảng lương' }];
        this.getOrganizations();
        this.getStaffPosition();
        this.loadTimesheetDetail();
    }

    loadTimesheetDetail(): void {
        this.summaryTimesheetService
            .getSelectSummaryTimeSheetForPayroll({})
            .subscribe((results) => {
                this.summaryTimesheets = results.data;
            });
    }

    showDialogAdd() {
        this.displayDialog = true;
    }
    closeDialogAdd() {
        this.displayDialog = false;
    }
    getStaffPosition(): void {
        const request: any = {
            pageSize: this.paging.pageSize,
            pageIndex: this.paging.pageIndex,
        };
        this.staffPositionService.getPaging(request).subscribe((response) => {
            if (response.status) {
                this.staffPosition = response.data.items.map((item: any) => ({
                    id: item.id,
                    name: item.positionName,
                }));
            }
        });
    }
    //#region Get Oragnization
    getOrganizations(): void {
        const request: any = {
            pageSize: this.paging.pageSize,
            pageIndex: this.paging.pageIndex,
        };
        this.organizationService.getPagingAll(request).subscribe((response) => {
            if (response.status) {
                this.treeData = this.transformToTreeNode(response.data.items);
            }
        });
    }
    transformToTreeNode(data: any[]): TreeNode[] {
        return data.map((item) => ({
            label: item.organizationName,
            data: item,
            children: item.organizationChildren
                ? this.transformToTreeNode(item.organizationChildren)
                : [],
            expanded: false,
        }));
    }
    //#endregion
    onOrganizationChange(event: any) {
        const organizationId = event.value ? event.value.id : null;
        this.organizationId = organizationId;
        this.getPagingSummaryTimesheet();
    }

    getPagingSummaryTimesheet(): void {
        const formValue = this.salaryForm.value;
        const request: any = {
            pageSize: this.paging.pageSize,
            pageIndex: this.paging.pageIndex,
            organizationId: formValue.organizationId?.data?.id,
            staffPositionId: this.staffPositionIds.join(','), // Chuyển thành chuỗi ID
        };
    }

    onStaffPositionChange(event: any) {}

    // validate
    leaveApplicationForm: FormGroup;
    validationMessages = {
        organizationId: [
            { type: 'required', message: 'Đơn vị không được để trống' },
        ],
        salaryTableNameStaffPositions: [
            { type: 'required', message: 'Vị trí không được để trống' },
        ],
        summaryTableName: [
            { type: 'required', message: 'Tên bảng lương không được để trống' },
        ],
    };

    selectAll(event: any): void {}

    handleCreateSalary(): void {
        if (this.salaryForm.valid) {
            if (this.selectedSummaryTimesheets.length > 0) {
                const summaryTimesheetNameStaffPositions =
                    this.salaryForm.value.salaryTableNameStaffPositions.map(
                        (position: any) => position.id
                    );

                const summaryTimesheetNameDetailTimesheetNames =
                    this.selectedSummaryTimesheets.map(
                        (position) => position.id
                    );
                const formData = {
                    organizationId:
                        this.salaryForm.value.organizationId?.data?.id,
                    payrollName: this.salaryForm.value?.summaryTableName,
                    summaryTimesheetNameIds:
                        summaryTimesheetNameDetailTimesheetNames,
                    staffPositionIds: summaryTimesheetNameStaffPositions,
                };

                this.payrollService.create(formData).subscribe((response) => {
                    this.salaryForm.reset();
                    this.closeDialogAdd();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thông báo',
                        detail: 'Thêm bảng lương thành công',
                    });
                    this.onCreated.emit();
                    this.route.queryParams.subscribe((params) => {
                        const request = {
                            ...params,
                            pageIndex: params['pageIndex']
                                ? params['pageIndex']
                                : this.config.paging.pageIndex,
                            pageSize: params['pageSize']
                                ? params['pageSize']
                                : this.config.paging.pageSize,
                        };

                        this.queryParameters = {
                            ...params,
                            status: params['status'] ? params['status'] : null,
                            name: params['name'] ? params['name'] : null,
                        };

                        this.getPayrolls();
                    });
                });
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Thông báo',
                    detail: 'Vui lòng chọn bảng công chi tiết',
                });
            }
        } else {
            this.salaryForm.markAllAsTouched();
        }
    }
}
