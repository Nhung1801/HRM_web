import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class LaborService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('natureoflabor/paging', request);
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('natureoflabor/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('natureoflabor/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('natureoflabor/update', request);
    }

    updateLabor(Id: number, resquest: any): Observable<any> {
        return this.http.put(`natureoflabor/update?id=${Id}`, resquest);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'natureoflabor/update',
            dataQueryParams,
            dataBody
        );
    }

    updateBodyAndQueryParamsStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'natureoflabor/update-status',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('natureoflabor/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('natureoflabor/delete', request);
    }

    deleteRange(request: any): Observable<any> {
        return this.http.put('natureoflabor/delete-range', request);
    }
}
