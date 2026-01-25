import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class NotifyTopbarService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('notification-work/paging', request);
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('staff-position/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('staff-position/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('banner/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'staff-position/update',
            dataQueryParams,
            dataBody
        );
    }

    updateBodyAndQueryParamsStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'staff-position/update-status',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('staff-position/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('staff-position/delete', request);
    }

    deleteRange(request: any): Observable<any> {
        return this.http.put('staff-position/delete-range', request);
    }
}
