import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { leavejob } from 'src/app/core/services/leavejob.service';
import { applyObject } from 'src/app/core/enums/apply-object.enum';
import { AuthService } from 'src/app/core/services/identity/auth.service';

//Phân quyền
import { HasPermissionHelper } from 'src/app/core/helpers/has-permission.helper';
import { PermissionConstant } from 'src/app/core/constants/permission-constant';

@Component({
  selector: 'app-type-of-vacation',
  templateUrl: './type-of-vacation.component.html',
  styleUrls: ['./type-of-vacation.component.scss'],
})
export class TypeOfVacationComponent implements OnInit {
  // Khởi tạo các biến cần thiết
  attendanceForm: FormGroup; // Form để quản lý bảng
  addLeaveForm: FormGroup; // Form cho dialog "Thêm Loại nghỉ"
  editLeaveForm: FormGroup; // Form sửa thông tin loại nghỉ


  totalItems: number = 0; // Tổng số bản ghi
  pageIndex: number = 1; // Trang hiện tại
  pageSize: number = 8; // Số bản ghi mỗi trang
  displayDialog: boolean = false; // Hiển thị dialog
  warningMessage: string = ''; // Tin nhắn cảnh báo
  selectedId: number | null = null; // ID được chọn để xóa
  displayAddDialog: boolean = false; // Hiển thị dialog thêm
  displayEditDialog: boolean = false; // Hiển thị popup chỉnh sửa
  organizationId: number | null = null; // Khai báo đơn vị

  ApplyObject = applyObject; // Khai báo enum

  //constanst
  permissionConstant = PermissionConstant;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private leavejob: leavejob, // Dịch vụ để gọi API
    private authService: AuthService,

    //Phân quyền
    public permission: HasPermissionHelper
  ) {
    // Tạo FormArray để quản lý các dòng trong bảng
    this.attendanceForm = this.fb.group({
      units: this.fb.array([]),
    });


    // Form Thêm loại nghỉ
    this.addLeaveForm = this.fb.group({
      organizationId: this.organizationId,
      name: ['', Validators.required],
      salaryRate: [0, [Validators.required]],
      maximumNumberOfDayOff: [0, [Validators.required]],
      note: [''],
      applyObject: [applyObject.CompanyWide, Validators.required],
    });

    // Form Chỉnh sửa loại nghỉ
    this.editLeaveForm = this.fb.group({
      id: [null],
      organizationId: [this.organizationId],
      name: [{ value: '', disabled: true }, Validators.required],
      salaryRate: [{ value: 0, disabled: true }, [Validators.required]],
      maximumNumberOfDayOff: [0, [Validators.required]],
      note: [''],
      applyObject: [applyObject.CompanyWide, Validators.required],
    });

  }

  ngOnInit() {
    //Lấy ra người dùng hiện tại
    this.authService.userCurrent.subscribe((user) => {
      this.organizationId = user.organization.id;
      console.log(this.organizationId);
    });


    this.fetchData(); // Gọi API khi khởi tạo component
  }

  // Hàm gọi API để lấy dữ liệu
  fetchData(event?: any) {

    if (event) {
      this.pageIndex = event.page + 1; // Lấy trang hiện tại từ sự kiện
      this.pageSize = event.rows;
    }

    const request = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };

    this.leavejob.getTypeOfLeave(request).subscribe({
      next: (response) => {
        this.totalItems = response.totalRecords; // Gán tổng số bản ghi
        this.populateData(response.items); // Đưa dữ liệu vào form
      },
      error: (err) => console.error('Lỗi khi gọi API:', err),
    });
  }

  // Đưa dữ liệu từ API vào FormArray để hiển thị lên bảng
  populateData(items: any[]) {
    //console.log('Dữ liệu từ API:', items);
    const unitsFormArray = this.attendanceForm.get('units') as FormArray;
    unitsFormArray.clear(); // Xóa dữ liệu cũ trước khi thêm mới
    items.forEach((item) => {
      unitsFormArray.push(
        this.fb.group({
          id: [item.id],
          organizationId: [item.organizationId],
          name: [item.name],
          salaryRate: [item.salaryRate],
          maximumNumberOfDayOff: [item.maximumNumberOfDayOff],
          note: [item.note],
          applyObject: [item.applyObject],
          selected: [false]
        })
      );
    });
  }

  // Lấy FormArray `units` từ FormGroup
  get units() {
    return this.attendanceForm.get('units') as FormArray;
  }

  // Hiển thị dialog xác nhận xóa
  confirmDelete(id: number, name: string) {
    this.selectedId = id;
    console.log('Xóa mục có ID:', this.selectedId);
    this.warningMessage = name;
    this.displayDialog = true;
  }

  // Mở dialog thêm loại nghỉ
  openAddDialog() {
    this.displayAddDialog = true;
    this.addLeaveForm.reset({
      organizationId: this.organizationId,
      name: '',
      salaryRate: 0,
      maximumNumberOfDayOff: 0,
      note: '',
      applyObject: applyObject.CompanyWide,
    });
  }

  // Đóng dialog thêm loại nghỉ
  closeAddDialog() {
    this.displayAddDialog = false;
  }


  // Mở popup chỉnh sửa
  openEditDialog(data: any) {
    this.editLeaveForm.patchValue(data); // Đưa dữ liệu của mục vào form
    this.displayEditDialog = true; // Hiển thị popup
  }

  // Đóng popup chỉnh sửa
  closeEditDialog() {
    this.displayEditDialog = false;
  }

  // Toggle trạng thái chọn tất cả checkbox
  toggleAllSelection(event: any) {
    const unitsFormArray = this.attendanceForm.get('units') as FormArray;
    const isChecked = event.checked;  // Trạng thái checkbox tiêu đề
    unitsFormArray.controls.forEach(control => {
      control.get('selected')?.setValue(isChecked);
    });
  }

  //hàm check số âm
  private getInvalidFields(form: FormGroup, fields: string[]): string[] {
    return fields.filter((field) => {
      const control = form.get(field);
      return control?.value < 0;
    });
  }

  //Xóa mục được chọn
  deleteItem() {
    console.log(this.selectedId);
    if (this.selectedId !== null) {
      // Gọi API xóa
      console.log('Gọi API xóa với ID:', this.selectedId); // Kiểm tra ID
      this.leavejob.deleteItemLeave(this.selectedId).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đã xóa loại nghỉ phép.',
          });
          this.displayDialog = false; // Đóng dialog
          this.fetchData(); // Tải lại dữ liệu
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Không thể xóa loại nghỉ phép.',
          });
        },
      });
    }
  }

  // Kiểm tra trùng lặp thông tin
  isDuplicateLeaveType(name: string): boolean {
    const unitsFormArray = this.attendanceForm.get('units') as FormArray;
    return unitsFormArray.controls.some((control) => control.value.name.trim().toLowerCase() === name.trim().toLowerCase());
  }


  //Thêm loại nghỉ
  createLeaveType() {
    const salaryRate = this.addLeaveForm.get('salaryRate')?.value;
    const maximumNumberOfDayOff = this.addLeaveForm.get('maximumNumberOfDayOff')?.value;

    if (this.addLeaveForm.valid) {
      const newLeave = this.addLeaveForm.value;

      // Kiểm tra trùng lặp trước khi thêm
      if (this.isDuplicateLeaveType(newLeave.name)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Trùng lặp',
          detail: 'Tên loại nghỉ đã tồn tại!',
        });
        return; // Dừng việc thêm mới
      }

      if (salaryRate < 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cảnh báo',
          detail: 'Không được để số âm',
        });
        return; // Dừng việc thêm mới
      }
  
      if (maximumNumberOfDayOff < 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cảnh báo',
          detail: 'Không được để số âm',
        });
        return; // Dừng việc thêm mới
      }


      this.leavejob.createLeaveType(newLeave).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đã thêm loại nghỉ mới!',
          });
          this.displayAddDialog = false;
          this.fetchData(); // Tải lại dữ liệu
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Không thể thêm loại nghỉ!',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng điền đầy đủ thông tin!',
      });
    }
  }


  //Sửa thông tin loại nghỉ
  saveEditedLeave() {
    //Lấy giá trị từ form ra
    const maximumNumberOfDayOff = this.addLeaveForm.get('maximumNumberOfDayOff')?.value;

    if (this.editLeaveForm.valid) {
      const updatedLeave = this.editLeaveForm.getRawValue();
      if (maximumNumberOfDayOff < 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cảnh báo',
          detail: 'Không được để số âm',
        });
        return; // Dừng việc thêm mới
      }

      this.leavejob.updateLeaveType(updatedLeave.id, updatedLeave).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Thông tin đã được cập nhật!',
          });
          this.displayEditDialog = false; // Đóng popup
          this.fetchData(); // Tải lại dữ liệu
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Không thể cập nhật thông tin!',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng điền đầy đủ thông tin!',
      });
    }
  }

}