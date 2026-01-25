import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
    console.log(2);
    return (control: AbstractControl) => {
        const value = control.value || '';
        const isWhitespace = value.trim().length === 0; // Kiểm tra nếu chuỗi chỉ chứa khoảng trắng
        const hasLeadingWhitespace = value.startsWith(' '); // Kiểm tra nếu có khoảng trắng ở đầu
        const isValid = !isWhitespace && !hasLeadingWhitespace;

        return isValid ? null : { whitespace: true };
    };
}

export function dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const dateOfBirth = new Date(control.value);
        const today = new Date();

        // Kiểm tra nếu ngày sinh lớn hơn ngày hiện tại
        if (dateOfBirth > today) {
            return { invalidDateOfBirth: true };
        }
        return null;
    };
}

export function emailValidator(
    control: AbstractControl
): ValidationErrors | null {
    const email = control.value;

    // Regular expression để kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && !emailPattern.test(email)) {
        return { invalidEmail: true };
    }

    return null;
}

export function referralCodeNotMatchingPhoneNumberValidator(): ValidationErrors | null {
    return (control: AbstractControl) => {
        const referralCode = control.value;
        const phoneNumber = control.parent?.get('phoneNumber')?.value;

        if (referralCode && referralCode === phoneNumber) {
            return { referralCodeMatchesPhoneNumber: true };
        }
        return null;
    };
}
