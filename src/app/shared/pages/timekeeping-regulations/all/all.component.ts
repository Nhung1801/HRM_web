import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { leavejob } from 'src/app/core/services/leavejob.service';
import { Monthlystatus } from 'src/app/core/enums/monthly-status.enum';
import { Leavestatus } from 'src/app/core/enums/leave-status.enum';
import { Caculationstatus } from 'src/app/core/enums/calculation.enum';
import { MessageService, SelectItem } from 'primeng/api';

//Phân quyền
import { HasPermissionHelper } from 'src/app/core/helpers/has-permission.helper';
import { PermissionConstant } from 'src/app/core/constants/permission-constant';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit {

  //Khởi tạo biến
  allForm: FormGroup; // Khai báo form
  organizationId: number | null = null;

  //constanst
  permissionConstant = PermissionConstant;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private leavejob: leavejob,
    private messageService: MessageService,

    //Phân quyền
    public permission: HasPermissionHelper,
  ) {
    // 
    this.allForm = this.formBuilder.group({
      admissionDay: ['', Validators.required], // Bắt buộc nhập
      monthlyLeaveAccrual: [Monthlystatus.AccrueLeaveMonthly, Validators.required],
      leaveCalculationStartPoint: [Leavestatus.Probationary, Validators.required],
      seniorityMonths: ['', Validators.required], // Bắt buộc nhập
      leaveCalculationForPartialMonth: [Caculationstatus.QuitJobAnyTimeOfTheMonth],
      numberOfDaysOff: [''], // Bắt buộc nhập
    });

  }

  ngOnInit(): void {
    this.authService.userCurrent.subscribe((user) => {
      this.organizationId = user.organization.id;
      console.log(this.organizationId);

      //Xử lí số âm ở ô input
      // const controlsToValidate = ['admissionDay', 'seniorityMonths', 'numberOfDaysOff'];
      // controlsToValidate.forEach((controlName) => {
      //   this.allForm.get(controlName)?.valueChanges.subscribe((value) => {
      //     if (value < 0) {
      //       this.messageService.add({
      //         severity: 'warn',
      //         summary: 'Lỗi nhập liệu',
      //         detail: `Không được để giá trị âm.`,
      //       });
      //     }
      //   });
      // });
    });


    // Khôi phục dữ liệu từ localStorage
    // const savedData = localStorage.getItem('leaveRegulationData');
    // if (savedData) {
    //   this.allForm.setValue(JSON.parse(savedData));
    // }


    this.allForm.get('leaveCalculationForPartialMonth')?.valueChanges.subscribe((value) => {
      if (value !== 1) {
        this.allForm.get('numberOfDaysOff')?.setValue('');
      }
    });

    //load id
    this.loadLeaveJobById(this.organizationId);
    
  }

  //Lấy ra id
  loadLeaveJobById(id: number): void {
    if (!id) {
      console.error('ID không hợp lệ!');
      return;
    }
  
    this.leavejob.getIDleavejob(id, {}).subscribe({
      next: (response) => {
        console.log('Dữ liệu quy định nghỉ:', response);
  
        // Gán giá trị nhận được từ server vào form
        this.allForm.patchValue({
          admissionDay: response.admissionDay || '',
          monthlyLeaveAccrual: response.monthlyLeaveAccrual || Monthlystatus.AccrueLeaveMonthly,
          leaveCalculationStartPoint: response.leaveCalculationStartPoint || Leavestatus.Probationary,
          seniorityMonths: response.seniorityMonths || '',
          leaveCalculationForPartialMonth: response.leaveCalculationForPartialMonth || Caculationstatus.QuitJobAnyTimeOfTheMonth,
          numberOfDaysOff: response.numberOfDaysOff || '',
        });
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể tải dữ liệu quy định nghỉ.',
        });
      },
    });
  }

  //Hàm hủy thông tin khi sửa và thêm
  onCancel(): void {
    // Đặt lại form về giá trị mặc định
    this.allForm.reset({
      admissionDay: '',
      monthlyLeaveAccrual: Monthlystatus.AccrueLeaveMonthly,
      leaveCalculationStartPoint: Leavestatus.Probationary,
      leaveCalculationForPartialMonth: Caculationstatus.QuitJobAnyTimeOfTheMonth,
      seniorityMonths: '',
      numberOfDaysOff: '',
    });

    // Xóa dữ liệu trong localStorage nếu cần
    //localStorage.removeItem('leaveRegulationData');
  }

  //Hàm sửa quy định nghỉ
  onSubmit(): void {
    if (!this.organizationId) {
      console.error('Organization ID not found!');
      return;
    }


    //Gửi dữ liệu khi form hợp lệ
    const request = {
      organizationId: this.organizationId,
      admissionDay: this.allForm.value.admissionDay,
      monthlyLeaveAccrual: this.allForm.value.monthlyLeaveAccrual,
      leaveCalculationStartPoint: this.allForm.value.leaveCalculationStartPoint,
      seniorityMonths: this.allForm.value.seniorityMonths,
      leaveCalculationForPartialMonth: this.allForm.value.leaveCalculationForPartialMonth,
      numberOfDaysOff: this.allForm.value.numberOfDaysOff,
    };

    if (this.allForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng nhập đầy đủ thông tin trước khi thực hiện!',
      });
      return; // Dừng lại nếu form không hợp lệ
    }

    // Kiểm tra giá trị âm trong form
    const invalidFields = [];
    ['admissionDay', 'seniorityMonths', 'numberOfDaysOff'].forEach((controlName) => {
      const value = this.allForm.get(controlName)?.value;
      if (value < 0) {
        invalidFields.push(controlName);
      }
    });

    if (invalidFields.length > 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Lỗi nhập liệu',
        detail: 'Không được nhập các số âm',
      });
      return; // Dừng nếu có lỗi
    }

    this.leavejob.createleavejob(request).subscribe({
      next: (response) => {
        console.log('Leave regulation updated successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: response.message,
        });

        if (response.id) {
          this.loadLeaveJobById(response.id); // Gọi hàm tải dữ liệu với ID vừa tạo
        }

        // Lưu dữ liệu vào localStorage
        //localStorage.setItem('leaveRegulationData', JSON.stringify(this.allForm.value));
      },
      error: (error) => {
        console.error('Error updating leave regulation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Không thành công',
          detail: error.message,
        });
      },
    });
  }

}
