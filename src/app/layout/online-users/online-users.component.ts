import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PresenceService } from 'src/app/core/signlrs/presence.service';
import { EmployeeService } from './../../core/services/employee.service';

@Component({
    selector: 'app-online-users',
    templateUrl: './online-users.component.html',
    styleUrl: './online-users.component.scss',
})
export class OnlineUsersComponent implements OnInit {
    // presenceService = inject(PresenceService);

    constructor(
        private presenceService: PresenceService,
        private employeeService: EmployeeService
    ) {}
    employees: any;
    onlineUsers = computed(() => this.presenceService.onlineUsers());
    isCollapsed = true; // Trạng thái thu nhỏ/mở rộng
    selectedUser: any = null; // Lưu user được chọn để mở chat

    ngOnInit(): void {
        this.presenceService.startConnection(); // Khởi động SignalR khi app load

        this.loadEmployee();
    }
    loadEmployee() {
        var request = { pageIndex: 1, pageSize: 100 };
        this.employeeService.paging(request).subscribe((res) => {
            this.employees = res.items;
            // **Sắp xếp lại danh sách nhân viên theo trạng thái Online trước**
            this.employees.sort((a, b) => {
                const aOnline = this.isUserOnline(a.id) ? 1 : 0;
                const bOnline = this.isUserOnline(b.id) ? 1 : 0;
                return bOnline - aOnline; // Đảo ngược để online lên trước
            });
        });
    }
    // Kiểm tra nếu employeeId có trong danh sách online
    isUserOnline(employeeId: number): boolean {
        return this.onlineUsers().some(
            (user) => user.employeeId === employeeId
        );
    }
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
    openChat(user: any) {
        this.selectedUser = user;
    }
}
