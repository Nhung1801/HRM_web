import { PayrollDetailService } from 'src/app/core/services/payroll-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayrollInquiryService } from 'src/app/core/services/payroll-inquiry.service';
import { MessageService } from 'primeng/api';
import { aN } from '@fullcalendar/core/internal-common';
import { InquiryStatus } from 'src/app/core/enums/payroll-inquiry.enum';
import { forkJoin } from 'rxjs';
import { PayrollConfirmationStatus } from 'src/app/core/enums/payroll.enum';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
    updateReasonVisible: boolean = false;
    id!: string; // Tham số `id`
    employeeid!: string; // Tham số `employeeid`
    totalReceiptSalary: number = 0;
    totalSalary: number = 0;
    payrollDetailEmployees: any;
    InquiryStatusEnum: typeof InquiryStatus = InquiryStatus;
    PayrollConfirmationStatusEnum: typeof PayrollConfirmationStatus =
        PayrollConfirmationStatus;
    constructor(
        private route: ActivatedRoute,
        private payrollDetailService: PayrollDetailService,
        private payrollInquiryService: PayrollInquiryService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        // Lấy các tham số từ URL
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id') || ''; // Lấy `id`
            this.employeeid = params.get('employeeid') || ''; // Lấy `employeeid`
            this.loadPayrollDetailEmployee({
                payrollId: this.id,
                employeeId: this.employeeid,
            });
        });
    }
    loadPayrollDetailEmployee(request: any): void {
        this.payrollDetailService.getPaging(request).subscribe((item: any) => {
            this.payrollDetailEmployees = item.items;
            this.totalReceiptSalary = this.payrollDetailEmployees.reduce(
                (acc, item) => acc + (item.totalReceivedSalary || 0),
                0
            );
            this.totalSalary = this.payrollDetailEmployees.reduce(
                (acc, item) => acc + (item.totalSalary || 0),
                0
            );
        });
    }

    handleConfirmPayrollEmployee(): void {
        if (
            !this.payrollDetailEmployees ||
            this.payrollDetailEmployees.length === 0
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Lỗi',
                detail: 'Không có bảng lương nào để xác nhận!',
            });
            return;
        }
        // Tạo danh sách các request
        const confirmRequests = this.payrollDetailEmployees.map(
            (item) => item.id
        );
        // Gửi request xác nhận danh sách bảng lương cùng lúc
        this.payrollDetailService
            .confirmPayrollDetail({ payrollDetailIds: confirmRequests })
            .subscribe({
                next: (results: any) => {
                    console.log(results);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Xác nhận tất cả bảng lương thành công!',
                    });

                    // Tải lại danh sách sau khi cập nhật thành công
                    this.loadPayrollDetailEmployee({
                        payrollId: this.id,
                        employeeId: this.employeeid,
                    });
                },
                error: (error) => {
                    console.error('Lỗi khi xác nhận bảng lương:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Có lỗi xảy ra khi xác nhận bảng lương!',
                    });
                },
            });
    }

    handleKhauTru(): number {
        if (
            !this.payrollDetailEmployees.deductions ||
            this.payrollDetailEmployees.deductions.length === 0
        ) {
            return 0;
        }

        const totalKhauTru = this.payrollDetailEmployees.deductions
            .filter((deduction) => !deduction.isDeleted) // Bỏ qua các khoản đã bị xóa
            .reduce((sum, deduction) => sum + (deduction.value || 0), 0); // Tính tổng
        return totalKhauTru;
    }
    reasonResponse: string = '';
    saveReason() {
        this.updateReasonVisible = false;
        var request = {
            payrollDetailId: this.payrollDetailEmployees[0].payrollDetailId,
            content: this.reasonResponse,
            status: this.InquiryStatusEnum.Pending,
        };
        this.payrollInquiryService.create(request).subscribe((res) => {
            console.log(res);
            if (res.status == true) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Gửi thắc mắc thành công',
                });
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Đã có lỗi xảy ra',
                });
            }
        });
    }
    getTotalDeduction(): number {
        return (
            this.payrollDetailEmployees?.reduce(
                (sum, item) => sum + (item.totalDeduction || 0),
                0
            ) || 0
        );
    }
}
