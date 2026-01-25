import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import roleConstant from 'src/app/core/constants/role.constant';
import { SetPasswordConstant } from 'src/app/core/constants/recover-password.constant';
import { Page } from 'src/app/core/enums/page.enum';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { ValidationService } from 'src/app/core/utils/validation.utils';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';


@Component({
    selector: 'app-set-password',
    templateUrl: './recover-password.component.html',
    styleUrl: './recover-password.component.scss',
})
export class RecoverPasswordComponent implements OnInit {

    //Core
    Page = Page;

    //Constant
    SetPasswordConstant = SetPasswordConstant;

    setPasswordFlag: any = SetPasswordConstant.SendOtp;
    sendOtpForm: FormGroup;
    fillOtpForm: FormGroup;
    setPasswordForm: FormGroup;

    validationMessages = {
        toEmail: [
            { type: 'required', message: 'Email không được để trống' },
            { type: 'email', message: 'Email không đúng định dạng' },
        ],
        email: [
            { type: 'required', message: 'Email không được để trống' },
            { type: 'email', message: 'Email không đúng định dạng' },
        ],
        newPassword: [
            { type: 'required', message: 'Mật khẩu mới không được để trống' },
            { type: 'maxlength', message: 'Quá nhiều kí tự' },
            { type: 'minlength', message: 'Quá ít kí tự-Mật khẩu phải có ít nhất 8 kí tự' },
            { type: 'pattern', message: 'Mật khẩu phải bao gồm cả số và chữ, không chứa khoảng trắng hoặc ký tự đặc biệt' },
        ],
        repeatNewPassword: [
            { type: 'required', message: 'Mật khẩu nhập lại không được để trống' },
            { type: 'maxlength', message: 'Quá nhiều kí tự' },
            { type: 'minlength', message: 'Quá ít kí tự-Mật khẩu phải có ít nhất 8 kí tự' },
            { type: 'pattern', message: 'Mật khẩu phải bao gồm cả số và chữ, không chứa khoảng trắng hoặc ký tự đặc biệt' },
        ],
        otp: [
            { type: 'required', message: 'Otp không được để trống' },
            { type: 'minLength', message: 'Otp phải có sáu chữ số' }
        ],
    };

    constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router, private messageService: MessageService) {
        this.sendOtpForm = this.fb.group({
            toEmail: ['', [Validators.required, Validators.email]]
        });
        this.fillOtpForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            otp: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.setPasswordForm = this.fb.group({
            email: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/)]],
            repeatNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/)]],
            otp: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit() {
    }

    isSubmitting: boolean = false;

    handleSendOtp() {
        if (this.isSubmitting) {
            return;
        }
        if (this.sendOtpForm.valid) {
            this.isSubmitting = true;
            const request = this.sendOtpForm.value;
            request.subject = '';
            request.body = '';
            this.authService.sendEmailOtpForgotPassword(request).subscribe(
                (res) => {
                    if (res.status) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: res.message,
                        });
                        const emailControl = this.fillOtpForm.get('email');
                        emailControl?.setValue(request.toEmail);
                        this.setPasswordFlag = SetPasswordConstant.FillOtp;
                        this.isSubmitting = false;

                    }
                    else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: res.message,
                        });
                        this.isSubmitting = false;

                    }
                },
                (exception) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Lỗi hệ thống',
                    });
                    this.isSubmitting = false;

                },
                () => {
                    this.isSubmitting = false;
                }
            );

        }
        else {
            markAllAsTouched(this.sendOtpForm);
            this.messageService.add({
                severity: 'warning',
                summary: 'Lỗi',
                detail: 'Cần nhập đủ thông tin',
            });
        }
    }

    handleFillOtp() {
        if (this.isSubmitting) {
            return;
        }
        if (this.fillOtpForm.valid) {
            this.isSubmitting = true;
            const request = this.fillOtpForm.value;
            this.authService.verifyOtpForgotPassword(request).subscribe(
                (res) => {
                    if (res.status) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: res.message,
                        });
                        const otpControl = this.setPasswordForm.get('otp');
                        otpControl?.setValue(request.otp);
                        const emailControl = this.setPasswordForm.get('email');
                        emailControl?.setValue(request.email);
                        this.setPasswordFlag = SetPasswordConstant.SetPassword;
                        this.isSubmitting = false;

                    }
                    else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: res.message,
                        });
                        this.isSubmitting = false;

                    }
                },
                (exception) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Lỗi hệ thống',
                    });
                    this.isSubmitting = false;

                },
                () => {
                    this.isSubmitting = false;
                }
            );

        }
        else {
            markAllAsTouched(this.fillOtpForm);
            this.messageService.add({
                severity: 'warning',
                summary: 'Lỗi',
                detail: 'Cần nhập đủ thông tin',
            });
        }
    }

    handleSetPassword() {
        if (this.isSubmitting) {
            return;
        }
        if (this.setPasswordForm.valid) {
            this.isSubmitting = true;
            if (this.setPasswordForm.value.newPassword == this.setPasswordForm.value.repeatNewPassword) {
                const request = this.setPasswordForm.value;
                this.authService.setPasswordAfterForgotPassword(request).subscribe(
                    (res) => {
                        if (res.status) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: '',
                            });
                            this.setPasswordFlag = SetPasswordConstant.SendOtp;
                            this.router.navigate([Page.Login]);
                            this.isSubmitting = false;

                        }
                        else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: res.message,
                            });
                            this.isSubmitting = false;

                        }
                    },
                    (exception) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Lỗi hệ thống',
                        });
                        this.isSubmitting = false;

                    },
                    () => {
                        this.isSubmitting = false;
                    }
                );
            }
            else {
                this.messageService.add({
                    severity: 'warning',
                    summary: 'Lỗi',
                    detail: 'Mật khẩu nhập lại chưa khớp',
                });
                this.isSubmitting = false;

            }

        }
        else {
            markAllAsTouched(this.setPasswordForm);
            this.messageService.add({
                severity: 'warning',
                summary: 'Lỗi',
                detail: 'Cần nhập đủ thông tin',
            });
        }

    }







    // handle otp input
    otp1: string = '';
    otp2: string = '';
    otp3: string = '';
    otp4: string = '';
    otp5: string = '';
    otp6: string = '';
    username: string = '';
    isVerifyOtpIn: boolean = false;
    messages: any[] = [];


    get maskedEmail(): string {
        const [localPart, domain] = this.username.split('@');
        if (localPart.length <= 3) {
            return `***@${domain}`;
        }
        return `${localPart.slice(0, 3)}***@${domain}`;
    }


    onPaste(event: ClipboardEvent) {
        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const pastedText = clipboardData.getData('text');

        if (pastedText.length === 6) {
            this.otp1 = pastedText[0];
            this.otp2 = pastedText[1];
            this.otp3 = pastedText[2];
            this.otp4 = pastedText[3];
            this.otp5 = pastedText[4];
            this.otp6 = pastedText[5];
            event.preventDefault();
        }
    }

    validateOtp() {
        const otp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}${this.otp5}${this.otp6}`;
        const otpControl = this.fillOtpForm.get('otp');

        otpControl?.setValue(otp.toString());
        if (otp.length === 6) {
            otpControl?.setErrors(null);
        } else {
            if (otp.length === 0) {
                otpControl?.setErrors({ required: true });
            }
            else {
                otpControl?.setErrors({ minLength: true });
            }
        }

        const otpInputElement = document.querySelector('input[formControlName="otp"]') as HTMLElement;
        if (otpInputElement) {
            otpInputElement.dispatchEvent(new Event('blur'));
        }
    }



    moveToNext(currentInput: HTMLInputElement, nextInput: HTMLInputElement) {
        if (currentInput.value.length === currentInput.maxLength) {
            nextInput.focus();
        }
    }

    moveToPrev(event: KeyboardEvent, prevInput: HTMLInputElement) {
        if (event.key === 'Backspace' && (event.target as HTMLInputElement).value.length === 0) {
            prevInput.focus();
        }
    }

    clearErrorMessage() {
        this.fillOtpForm.get('otp')?.setErrors(null);
    }

    onlyNumbers(event: any) {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.handleSetPassword();
        }
    }



}
