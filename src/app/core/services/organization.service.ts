import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(private http: HttpLoadingService, private httpld: HttpClient) { }
    getPagingAll(request: any = null): Observable<any> {
        return this.http.get('organization/paging', request);
    }

    exportToExcel(request: any = null): Observable<Blob> {
        let params = new HttpParams();
    
        if (request) {
            if (request.keyWord !== undefined && request.keyWord !== null) {
                params = params.set('keyWord', request.keyWord);
            }
            if (request.OrganizationId !== undefined && request.OrganizationId !== null) {
                params = params.set('OrganizationId', request.OrganizationId.toString());
            }
            if (request.SortBy) {
                params = params.set('SortBy', request.SortBy);
            }
            if (request.OrderBy) {
                params = params.set('OrderBy', request.OrderBy);
            }
            // KHÔNG set PageIndex, PageSize để export toàn bộ
        }
    
        return this.httpld.get('/organization/export', {
            params,
            responseType: 'blob' as 'json',
        }) as Observable<Blob>;
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
