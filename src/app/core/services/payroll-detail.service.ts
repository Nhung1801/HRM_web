import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class PayrollDetailService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('payroll-detail/paging', request);
    }

    confirmPayrollDetail(dataBody: any): Observable<any> {
        return this.http.post(
            'payroll-detail/confirm-payroll-detail-by-employee',
            dataBody
        );
    }

    sendPayrollDetailConfirm(request: any): Observable<any> {
        // Backend nhận JSON [FromBody]
        return this.http.post(
            'payroll-detail/send-payroll-detail-confirmation',
            request
        );
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('payroll-detail/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('payroll-detail/create', request);
    }

    fetchData(request: any): Observable<any> {
        return this.http.postBodyAndQueryParams(
            'payroll-detail/fetch-payroll-details',
            request,
            null
        );
    }
    reCalculate(request: any): Observable<any> {
        return this.http.postBodyAndQueryParams(
            'payroll-detail/recalculate-and-save-payroll-details',
            request,
            null
        );
    }
    update(request: any): Observable<any> {
        return this.http.putFormData('payroll-detail/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'payroll-detail/update',
            dataQueryParams,
            dataBody
        );
    }

    updateBodyAndQueryParamsStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'payroll-detail/update-status',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('payroll-detail/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('payroll-detail/delete', request);
    }

    deleteRange(request: any): Observable<any> {
        return this.http.put('payroll-detail/delete-range', request);
    }
}
