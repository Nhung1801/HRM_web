import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { TimekeepingLocationService } from 'src/app/core/services/timekeepingLocation.service';
@Component({
    selector: 'app-location-update',
    templateUrl: './location-update.component.html',
    styleUrl: './location-update.component.scss',
})
export class LocationUpdateComponent {
    updateForm: FormGroup;
    id: number;
    IdUpdate: number;
    constructor(
        private formBuilder: FormBuilder,
        private route: Router,
        private router: ActivatedRoute,
        private locationService: TimekeepingLocationService,
        private toastService: ToastService,
        private messService: MessageService
    ) {
        this.updateForm = this.formBuilder.group({
            organizationId: [null],
            name: [null, Validators.required],
            latitude: [
                null,
                [
                    Validators.required,
                    Validators.pattern('^-?([1-8]?[0-9]|90)\\.\\d+$'),
                ],
            ],
            longitude: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        '^-?((([1-9])|([1-9][0-9]))\\d*)\\.(\\d+)$'
                    ),
                ],
            ],
            allowableRadius: [null, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit() {
        this.id = +this.router.snapshot.paramMap.get('id');
        this.locationService.getByID(this.id).subscribe((res) => {
            this.IdUpdate = res.id;

            this.updateForm.patchValue({
                organizationId: res.organizationId,
                name: res.name,
                latitude: res.latitude,
                longitude: res.longitude,
                allowableRadius: res.allowableRadius,
            });
        });
    }
    handleUpdate() {
     

            const resquest = {
                organizationId: this.updateForm.get('organizationId').value,
                name: this.updateForm.get('name').value,
                latitude: this.updateForm.get('latitude').value,
                longitude: this.updateForm.get('longitude').value,
                allowableRadius: this.updateForm.get('allowableRadius').value,
            };
            this.locationService.updateLocation(this.IdUpdate, resquest).subscribe(
                (res) => {
                  if(res.status){
                    this.updateForm.reset()
                    this.messService.add({
                        severity:'success',
                        summary:'Thông báo',
                        detail:'Cập nhật thành công'
                    })
                    this.route.navigate(['/location'])
                  }
                  else{
                    this.messService.add({
                        severity:'error',
                        summary:'Thông báo',
                        detail:'Cập nhật thất bại'
                    })
                  }
                },
             
            );
    }
}
