import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(private http: HttpLoadingService, private httpld: HttpClient) { }
    getPagingAll(request: any = null): Observable<any> {
        return this.http.get('organization/paging', request);
    }
    getPaging(request: any = null): Observable<any> {
        return this.http.get('organization/get-select', request);
    }

    deleteOrganization(organizationId: any): Observable<any> {
        const url = `/organization/delete?organizationId=${organizationId}`;
        return this.httpld.put(url, organizationId);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('staff-position/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('banner/update', request);
    }

    delete(request: any): Observable<any> {
        return this.http.put('banner/delete', request);
    }
}
