import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Base {

    static whitespaceValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            // Kiểm tra nếu chỉ toàn là khoảng trắng
            const isWhitespace = value.trim().length === 0 && value.length > 0;
            return isWhitespace ? { whitespace: true } : null;
        };
    }

    static preventSpace(event: KeyboardEvent) {
        if (event.key === ' ') {
            event.preventDefault();
        }
    }


    static dateBeforeTodayValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const selectedDate = new Date(control.value);
        const today = new Date();

        // Chỉ so sánh ngày, bỏ qua thời gian
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (control.value && selectedDate > today) {
            return { invalidDate: true }; // Trả về lỗi nếu ngày được chọn lớn hơn ngày hiện tại
        }
        return null; // Không có lỗi
    }

}
