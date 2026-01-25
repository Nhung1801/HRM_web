import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrl: './work-calendar.component.scss'
})
export class WorkCalendarComponent implements OnInit {
  weeks: any[] = [];
  currentMonth: number = new Date().getMonth(); // Tháng hiện tại
  currentYear: number = new Date().getFullYear(); // Năm hiện tại
  selectedTab: string = 'month'; // Default is "Tháng"

  employeeTasks: { [key: string]: { name: string; startDate: string; endDate: string }[] } = {
    '2025-01-01': [
      { name: 'Họp dự án', startDate: '2025-01-01', endDate: '2025-01-01' },
      { name: 'Báo cáo kết quả', startDate: '2025-01-01', endDate: '2025-01-01' },
    ],
    '2025-01-07': [
      { name: 'Gặp khách hàng', startDate: '2025-01-07', endDate: '2025-01-08' },
    ],
    '2025-01-10': [
      { name: 'Triển khai kế hoạch', startDate: '2025-01-10', endDate: '2025-01-12' },
      { name: 'Đào tạo nhân viên', startDate: '2025-01-10', endDate: '2025-01-10' },
    ],
    '2025-01-15': [
      { name: 'Họp định kỳ', startDate: '2025-01-15', endDate: '2025-01-15' },
    ],
    '2025-01-20': [
      { name: 'Kiểm tra tiến độ', startDate: '2025-01-20', endDate: '2025-01-22' },
      { name: 'Họp nhóm', startDate: '2025-01-20', endDate: '2025-01-20' },
      { name: 'Viết báo cáo', startDate: '2025-01-20', endDate: '2025-01-21' },
    ],
    '2025-01-25': [
      { name: 'Nghỉ lễ', startDate: '2025-01-25', endDate: '2025-01-25' },
    ],
    '2025-01-30': [
      { name: 'Bàn giao tài liệu', startDate: '2025-01-30', endDate: '2025-01-31' },
    ],
  };
  
  constructor() { }

  ngOnInit(): void {
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDate = new Date(firstDayOfMonth);
    if (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Lùi về thứ 2 gần nhất
    }

    let endDate = new Date(lastDayOfMonth);
    if (endDate.getDay() !== 0) {
      endDate.setDate(endDate.getDate() + (7 - endDate.getDay())); // Tiến tới chủ nhật gần nhất
    }

    let current = new Date(startDate);
    this.weeks = [];
    while (current <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dayKey = this.formatDateToKey(current); // Sử dụng hàm formatDateToKey
        const tasks = this.employeeTasks[dayKey] || [];
        week.push({
          date: new Date(current),
          isCurrentMonth: current.getMonth() === month, // Đánh dấu ngày trong tháng hiện tại
          tasks: tasks.map(task => ({
            ...task,
            width: this.calculateTaskWidth(task.startDate, task.endDate), // Tính chiều rộng
          }))
        });
        current.setDate(current.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  calculateCellHeight(tasks: any[]): number {
    const baseHeight = 60; // Chiều cao cơ bản của ô
    const taskHeight = 30; // Chiều cao bổ sung cho mỗi công việc
    return baseHeight + tasks.length * taskHeight;
  }
  
  calculateTaskWidth(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * 160; // Mỗi ngày là 100px (có thể tùy chỉnh)
  }

  formatDateToKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm '0' nếu cần
    const day = date.getDate().toString().padStart(2, '0'); // Thêm '0' nếu cần
    return `${year}-${month}-${day}`;
  }


  getMonthName(monthIndex: number): string {
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
    ];
    return months[monthIndex];
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11; // Quay lại tháng 12
      this.currentYear--; // Lùi về năm trước
    }
    this.generateCalendar(this.currentYear, this.currentMonth); // Tạo lại lịch cho tháng trước
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0; // Quay lại tháng 1
      this.currentYear++; // Sang năm tiếp theo
    }
    this.generateCalendar(this.currentYear, this.currentMonth); // Tạo lại lịch cho tháng sau
  }
}
