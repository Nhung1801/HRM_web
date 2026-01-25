import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { TimekeepingLocationService } from 'src/app/core/services/timekeepingLocation.service';

@Component({
    selector: 'app-location-create',
    templateUrl: './location-create.component.html',
    styleUrl: './location-create.component.scss',
})
export class LocationCreateComponent {
    createLcocation: FormGroup;
    boundaryCoordinates: { latitude: number; longitude: number }[] = [];
    lat1: number; // Vĩ độ của điểm 1
    lng1: number;
    //var
    user: any;
    constructor(
        private formBuilder: FormBuilder,
        private locationService: TimekeepingLocationService,
        private toast: ToastService,
        private companyService: CompanyInfoService,
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.userCurrent.subscribe((user) => {
            this.user = user;
            // console.log(this.user);
        });
    }
    ngOnInit() {
        this.createLcocation = this.formBuilder.group({
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

    calculateBoundary() {
        this.haversineDistance();

        // if (this.createLcocation.invalid) {
        //   alert('Vui lòng nhập đầy đủ và đúng định dạng!');
        //   return;
        // }
        // const lat = parseFloat(this.createLcocation.get('latitude')?.value);
        // const lng = parseFloat(this.createLcocation.get('longitude')?.value);
        // const radius = parseFloat(this.createLcocation.get('allowableRadius')?.value);

        // this.boundaryCoordinates = this.getBoundaryCoordinates(lat, lng, radius);
    }

    handleSubmit() {
        this.companyService.getCompanyById(1).subscribe((res) => {
            const resquest = {
                organizationId: res.data.id,
                name: this.createLcocation.get('name').value,
                latitude: this.createLcocation.get('latitude').value,
                longitude: this.createLcocation.get('longitude').value,
                allowableRadius:
                    this.createLcocation.get('allowableRadius').value,
            };
            this.locationService.createLocation(resquest).subscribe(
                (res) => {
                    this.createLcocation.reset();
                    this.router.navigate(['/location']);
                    this.toast.showSuccess('Thông báo', 'Thêm thành công');
                },
                (error) => {
                    this.toast.showError('Thông báo', 'Thêm thất bại');
                }
            );
        });
    }

    toRadians(degrees: number): number {
        return degrees * (Math.PI / 180); // Chuyển độ sang radian
    }

    haversineDistance(): number {
        this.lat1 = this.createLcocation.get('latitude')?.value;
        this.lng1 = this.createLcocation.get('longitude')?.value;
        const lat2 = 21.03; // vĩ độ của người chấm công
        const lng2 = 105.855; // kinh độ của người chấm công
        const R = 6371;
        const dLat = this.toRadians(lat2 - this.lat1);
        const dLng = this.toRadians(lng2 - this.lng1);
        // Áp dụng công thức Haversine
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(this.lat1)) *
                Math.cos(this.toRadians(lat2)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        console.log(R * c * 1000);
        return R * c;
    }

    // tính vĩ độ và kinh độ bán kính từ trung tâm
    // getBoundaryCoordinates(
    //   centerLat: number,
    //   centerLng: number,
    //   radius: number // radius tính bằng mét
    // ): { latitude: number; longitude: number }[] {
    //   const coordinates = [];
    //   const earthRadius = 6371;

    //   const radiusInKm = radius / 1000;

    //   for (let angle = 0; angle < 360; angle += 1) {
    //     const angleRad = (angle * Math.PI) / 180;
    //     const newLat =
    //       centerLat +
    //       (radiusInKm / earthRadius) * (180 / Math.PI) * Math.cos(angleRad);
    //     const newLng =
    //       centerLng +
    //       (radiusInKm / earthRadius) *
    //         (180 / Math.PI) *
    //         Math.sin(angleRad) /
    //         Math.cos(centerLat * (Math.PI / 180));

    //     coordinates.push({ latitude: newLat, longitude: newLng });
    //   }

    //   return coordinates;
    // }
}
