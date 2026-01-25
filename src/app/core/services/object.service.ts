import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Header } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ObjectService {
    constructor(private http: HttpLoadingService,
        private httpld: HttpClient
    ) {}

    //thêm đối tượng nhân viên
    createObject(request: any): Observable<any> {
        return this.http.postFormData('employee/create', request);
    }

    getObject(request: any): Observable<any> {
        return this.http.post('employee/paging', request);
    }

    postcheckemail(request: any): Observable<any> {
        return this.http.postFormData('auth/resend-activation-email', request);
    }

    getPaging(request: any = null): Observable<any> {
        return this.http.get('company/paging', request);
    }

    getAllEmployee(resquest: any = null): Observable<any> {
        return this.http.get('employee/paging', resquest);
    }

    getId(request: any): Observable<any> {
        return this.http.get('employee/get-by-id', request);
    }

    updateObject(id: string,request: any): Observable<any> {
        return this.http.putFormData(`employee/update?id=${id}`, request);
    }
    updateEmployeeData(
        id: number,
        resquest: FormData
    ): Observable<any> {
        const headers = new HttpHeaders();
        return this.httpld.put(`/employee/update?id=${id}`, resquest, {headers});
    }

    deleteEmployee(id: number): Observable<any> {
        return this.http.delete(`employee/delete?id=${id}`);
    }
    getInforEmployee( request: any): Observable<any> {
        return this.http.get("employee/get-profile-info-by-id", request);
    }
}