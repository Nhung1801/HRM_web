import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class TypeOfLeaveService {
    constructor(private http: HttpLoadingService) {}

    paging(request: any = null): Observable<any> {
        return this.http.get('type-of-leave/paging', request);
    }

    getDaysRemaining(request: any = null): Observable<any> {
        return this.http.get('type-of-leave-employee/get-or-create', request);
    }
    
    checkDaysRemaining(request: any = null): Observable<any> {
        return this.http.get('type-of-leave-employee/check-days-remaining', request);
    }


    // getAll(request: any = null): Observable<any> {
    //     return this.http.get('type-of-leave/get-all', request);
    // }

    // create(request: any): Observable<any> {
    //     return this.http.postFormData('type-of-leave/create', request);
    // }

    // update(request: any): Observable<any> {
    //     return this.http.putFormData('type-of-leave/update', request);
    // }

    // updateBodyAndQueryParams(
    //     dataQueryParams: any,
    //     dataBody: any
    // ): Observable<any> {
    //     return this.http.putBodyAndQueryParams(
    //         'type-of-leave/update',
    //         dataQueryParams,
    //         dataBody
    //     );
    // }

    // delete(request: any): Observable<any> {
    //     return this.http.put('type-of-leave/delete', request);
    // }

    // deleteSoft(request: any): Observable<any> {
    //     return this.http.deleteSoft('type-of-leave/delete', request);
    // }
}
