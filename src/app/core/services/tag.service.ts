import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class TagService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('tag/paging', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('staff-title/get-all', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('tag/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('tag/update', request);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'tag/update',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('tag/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('tag/delete', request);
    }
}
