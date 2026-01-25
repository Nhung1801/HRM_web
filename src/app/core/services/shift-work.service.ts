import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class ShiftWorkService {
    constructor(private http: HttpLoadingService) { }
    getPaging(request: any = null): Observable<any> {
        return this.http.get('shift-work/paging', request);
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('shift-work/get-by-id', request);
    }

    getByEmployee(request: any = null): Observable<any> {
        return this.http.get('shift-work/get-by-employee', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('shift-work/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('banner/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'shift-work/update',
            dataQueryParams,
            dataBody
        );
    }

    updateBodyAndQueryParamsStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'shift-work/update-status',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('shift-work/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('shift-work/delete', request);
    }

    deleteRange(request: any): Observable<any> {
        return this.http.put('shift-work/delete-range', request);
    }
}
