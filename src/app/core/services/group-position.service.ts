import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class GroupPositionService {
    constructor(private http: HttpLoadingService) {}

    getAll(request: any = null): Observable<any> {
        return this.http.get('group-position/get-all', request);
    }
    getPaging(request: any = null): Observable<any> {
        return this.http.get('banner/paging', request);
    }

    create(request: FormData): Observable<any> {
        return this.http.postFormData('group-position/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('group-position/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'group-position/update',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('group-position/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('group-position/delete', request);
    }
}
