import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {
  @Input() form?: FormGroup<any>;
  @Input() field: string = '';
  @Input() messages: any;

  ngOnInit(): void {
  }

  // show first error (not show all error of form control)
  isFirstError(errorType: string): boolean {
    const control = this.form?.controls?.[this.field];
    if (!control || !control.errors) return false;
      const errors = Object.keys(control.errors);
    return errors.length > 0 && errors[0] === errorType;
  }
  
  
}
