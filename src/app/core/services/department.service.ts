import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }

    create(request: any): Observable<any> {
        return this.http.post('department/create', request);
    }

    getRoles(request: any = null): Observable<any> {
        return this.http.get('department/get-roles', request);
    }

    paging(request: any = null): Observable<any> {
        return this.http.get('department/paging', request);
    }

    getById(request: any): Observable<any> {
        return this.http.get('department/get-by-id', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('department/get-all', request);
    }
    
    getAllByEmployee(request: any = null): Observable<any> {
        return this.http.get('department/get-all-by-employee', request);
    }

    pagingEmployeeInDepartment(request: any = null): Observable<any> {
        return this.http.get('department/paging-employee-in-department', request);
    }

    pagingEmployeeNotInDepartment(request: any = null): Observable<any> {
        return this.http.get('department/paging-employee-not-in-department', request);
    }
    
    update(request: any): Observable<any> {
        return this.http.put('department/update', request);
    }

    updateDepartmentBasicInfo(request: any): Observable<any> {
        return this.http.put('department/update-info-base', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.put('department/delete-soft', request);
    }


    


}
