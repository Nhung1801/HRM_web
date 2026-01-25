import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class AllowanceService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('allowance/paging', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('staff-title/get-all', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('staff-title/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('staff-title/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'staff-title/update',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('staff-title/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('staff-title/delete', request);
    }
}
