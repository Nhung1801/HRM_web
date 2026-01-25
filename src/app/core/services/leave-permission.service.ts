import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LeavePermissionService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }

    GetLeavePermissionByEmployee(request: any): Observable<any> {
        return this.http.get('leave-permission/get-number-of-days-off-paid-leave', request);
    }
    
}
