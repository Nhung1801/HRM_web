import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Page } from 'src/app/core/enums/page.enum';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
	selector: 'app-set-password',
	templateUrl: './set-password.component.html',
	styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnInit {

	//Core
	Page = Page;


	setPasswordForm: FormGroup;

	validationMessages = {
		email: [
			{ type: 'required', message: 'Email không được để trống' },
		],
		newPassword: [
			{ type: 'required', message: 'Mật khẩu không được để trống' },
			{ type: 'maxlength', message: 'Quá nhiều kí tự' },
        	{ type: 'minlength', message: 'Quá ít kí tự-Mật khẩu phải có ít nhất 8 kí tự' },
			{ type: 'pattern',  message: 'Mật khẩu phải bao gồm cả số và chữ, không chứa khoảng trắng hoặc ký tự đặc biệt' },
		],
		repeatPassword: [
			{ type: 'required', message: 'Mật khẩu nhập lại không được để trống' },
			{ type: 'maxlength', message: 'Quá nhiều kí tự' },
        	{ type: 'minlength', message: 'Quá ít kí tự-Mật khẩu phải có ít nhất 8 kí tự' },
			{ type: 'pattern',  message: 'Mật khẩu phải bao gồm cả số và chữ, không chứa khoảng trắng hoặc ký tự đặc biệt' },
		],
		otp: [
			{ type: 'required', message: 'Otp không được để trống' },	
			{ type: 'minLength', message: 'Otp phải có sáu chữ số' },
		],
	};

	constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
		this.setPasswordForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			newPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(25), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/)]],
			repeatPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(25),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/)]],
			activationCode: ['', [Validators.required]],
		});
	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			const email = params['email'];
			const activationCode = params['activationCode'];

			this.setPasswordForm.get('email').setValue(email);
			this.setPasswordForm.get('activationCode').setValue(activationCode);

			console.log('email:', email);
			console.log('activationCode:', activationCode);
		});
	}


	isSubmitting: boolean = false;

	handleSetPassword() {
		if (this.isSubmitting) {
			return;
		}
		if (this.setPasswordForm.valid) {
			this.isSubmitting = true;
			if (this.setPasswordForm.value.newPassword == this.setPasswordForm.value.repeatPassword) {
				const request = this.setPasswordForm.value;
				this.authService.setPassword(request).subscribe(
					(res) => {
						if (res.status) {
							this.messageService.add({
								severity: 'success',
								summary: 'Thành công',
								detail: '',
							});
							this.router.navigate([Page.Home]);
						}
						else {
							this.messageService.add({
								severity: 'error',
								summary: 'Lỗi',
								detail: res.message,
							});
						}
					},
					(exception) => {
						this.messageService.add({
							severity: 'error',
							summary: 'Lỗi',
							detail: 'Lỗi hệ thống',
						});
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
}
