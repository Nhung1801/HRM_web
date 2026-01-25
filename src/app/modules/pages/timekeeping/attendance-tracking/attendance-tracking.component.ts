import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TimekeepingUnitService } from 'src/app/core/services/timekeepingUnit.service';

//phân quyền
import { HasPermissionHelper } from 'src/app/core/helpers/has-permission.helper';
import { PermissionConstant } from 'src/app/core/constants/permission-constant';


@Component({
  selector: 'app-attendance-tracking',
  templateUrl: './attendance-tracking.component.html',
  styleUrls: ['./attendance-tracking.component.css']
})
export class AttendanceTrackingComponent implements OnInit {

  // Biến
  attendanceForm: FormGroup;
  displayDialog: boolean = false; // Hiển thị dialog
  warningMessage: string = "Bộ phận Kinh doanh"; // Tin nhắn cảnh báo
  selectedOrganizationId: number | null = null; // biến xóa

  // Biến trạng thái button
  isGpsActive: boolean = true;
  isAttendanceActive: boolean = false;

  //constans
  permissionConstant = PermissionConstant;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private apiorgnizations: TimekeepingUnitService,
    public permission: HasPermissionHelper,
  ) {
    // Khởi tạo form
    this.attendanceForm = this.fb.group({
      allowWeb: [true],
      allowMobile: [false],
      units: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  // Gọi Api lấy dữ liệu
  fetchData() {
    this.apiorgnizations.getAllorganization({})
      .subscribe({
        next: (response) => this.populateData(response),
        error: (err) => console.error('Lỗi khi gọi API', err)
      });
  }

  //Đưa dữ liệu vào form
  populateData(data: any[]) {
    const unitsFormArray = this.attendanceForm.get('units') as FormArray;
    unitsFormArray.clear();
    data.forEach(item => {
      unitsFormArray.push(this.fb.group({
        id: [item.id],
        organizationName: [item.organizationName || 'Không xác định'],
        isForAllEmployees: [item.isForAllEmployees],
        allowableRadius: [item.allowableRadius],
        selected: [false]
      }));
    });
  }

  // Lấy mảng units từ FormGroup
  get units() {
    return this.attendanceForm.get('units') as FormArray;
  }

  // Xóa dữ liệu trong bảng
  deleteSelectedOrganization() {
    if (this.selectedOrganizationId !== null) {
      this.apiorgnizations.deleteOrganization(this.selectedOrganizationId)
        .subscribe({
          next: () => {
            this.displayDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa địa điểm chấm công thành công.' });
            this.fetchData();
          },
          error: (err) => {
            console.error('Lỗi khi xóa địa điểm chấm công:', err);
            this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Không thể xóa địa điểm chấm công.' });
          }
        });
    }
  }

  // Hiển thị dialog cảnh báo xóa
  confirmDelete(id: number, organizationName: string) {
    this.selectedOrganizationId = id;
    this.warningMessage = organizationName;
    this.displayDialog = true;
  }

  // Toggle trạng thái chọn tất cả checkbox
  toggleAllSelection(event: any) {
    const unitsFormArray = this.attendanceForm.get('units') as FormArray;
    const isChecked = event.checked;  // Trạng thái checkbox tiêu đề
    unitsFormArray.controls.forEach(control => {
      control.get('selected')?.setValue(isChecked);
    });
  }

  // Xử lý sự kiện bấm vào button "Định vị GPS"
  onGpsClick() {
    this.isGpsActive = !this.isGpsActive;
    this.isAttendanceActive = false;  // Đảm bảo nút "Máy chấm công" không được chọn
  }

  // Xử lý sự kiện bấm vào button "Máy chấm công"
  onAttendanceClick() {
    this.isAttendanceActive = !this.isAttendanceActive;
    this.isGpsActive = false;  // Đảm bảo nút "Định vị GPS" không được chọn
  }

}
