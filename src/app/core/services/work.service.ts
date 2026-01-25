import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class WorkService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('work/paging', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('work/get-all', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('work/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('work/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'work/update',
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
