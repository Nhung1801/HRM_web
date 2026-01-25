import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class DeductionService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('deduction/get-all', request);
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('deduction/get-deduction-by-employeeid', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('deduction/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('deduction/update', request);
    }

    updateLabor(Id: number, resquest: any): Observable<any> {
        return this.http.put(`deduction/update?id=${Id}`, resquest);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'deduction/update',
            dataQueryParams,
            dataBody
        );
    }

    updateBodyAndQueryParamsStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'deduction/update-status',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('deduction/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('deduction/delete', request);
    }

    deleteRange(request: any): Observable<any> {
        return this.http.put('deduction/delete-range', request);
    }
}
