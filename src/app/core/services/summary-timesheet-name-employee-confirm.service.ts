import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SummaryTimesheetNameEmployeeConfirmService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    pagingEmployee(request: any = null): Observable<any> {
        return this.http.get('summary-timesheet-name-employee-confirm/paging-by-employee', request);
    }

    getStatusByEmployee(request: any = null): Observable<any> {
        return this.http.get('summary-timesheet-name-employee-confirm/get-status-by-employee', request);
    }

    getDetail(request: any = null): Observable<any> {
        return this.http.get('summary-timesheet-name-employee-confirm/get-detail', request);
    }

    getDetailByShiftWork(request: any = null): Observable<any> {
        return this.http.get('summary-timesheet-name-employee-confirm/get-detail-by-shift-work', request);
    }

    createOrUpdate(request: any): Observable<any> {
        return this.http.post('summary-timesheet-name-employee-confirm/create-or-update', request);
    }

    createOrUpdateMultiple(request: any): Observable<any> {
        return this.http.post('summary-timesheet-name-employee-confirm/create-or-update-multiple', request);
    }
    // paging(request: any = null): Observable<any> {
    //     return this.http.get('leave-application/paging', request);
    // }

    // getById(request: any): Observable<any> {
    //     return this.http.get('leave-application/get-by-id', request);
    // }

    // update(
    //     dataQueryParams: any,
    //     dataBody: any
    // ): Observable<any> {
    //     return this.http.putBodyAndQueryParams(
    //         'leave-application/update',
    //         dataQueryParams,
    //         dataBody
    //     );
    // }

    // updateStatus(
    //     dataQueryParams: any,
    //     dataBody: any
    // ): Observable<any> {
    //     return this.http.putBodyAndQueryParams(
    //         'leave-application/update-status',
    //         dataQueryParams,
    //         dataBody
    //     );
    // }

    // updateStatusMultiple(request: any): Observable<any> {
    //     return this.http.put('leave-application/update-status-multiple', request);
    // }


    // getTypeOfLeaveEmployee(request: any = null): Observable<any> {
    //     return this.http.get('type-of-leave-employee/get-or-create', request);
    // }

  
   

}
