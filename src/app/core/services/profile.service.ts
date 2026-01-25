// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {

// constructor() { }

// }
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    pipe(
        arg0: MonoTypeOperatorFunction<unknown>,
        arg1: OperatorFunction<unknown, any>,
        arg2: MonoTypeOperatorFunction<unknown>,
        arg3: OperatorFunction<unknown, any>
    ) {
        throw new Error('Method not implemented.');
    }
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('profile/paging', request);
    }

    getAllProfiles(request: any = null): Observable<any> {
        return this.http.get('profile/all', request);
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('staff-position/get-by-id', request);
    }

    getProfileByCustomerId(request: any = null): Observable<any> {
        return this.http.get('employee/get-profile-info-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('staff-position/create', request);
    }

    createGeneralInfo(request: any): Observable<any> {
        return this.http.postFormData('profile-info/create', request);
    }

    updateGeneralInfo(requestParams: any, requestBody: any): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'profile-info/update',
            requestParams,
            requestBody
        );
    }

    getGeneralInfoById(request: any = null): Observable<any> {
        return this.http.get('profile-info/get-by-id', request);
    }

    createContactInfo(request: any): Observable<any> {
        return this.http.postFormData('contract-info/create', request);
    }

    updateContactInfo(requestParams: any, requestBody: any): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'contact-info/update',
            requestParams,
            requestBody
        );
    }

    updateJobInfo(requestParams: any, requestBody: any): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'job-info/update',
            requestParams,
            requestBody
        );
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
    unLockUser(request: any): Observable<any> {
        return this.http.post('user/lock-unlock', request);
    }
}
