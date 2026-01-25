import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }

    create(request: any): Observable<any> {
        return this.http.post('project/create', request);
    }

    getRoles(request: any = null): Observable<any> {
        return this.http.get('project/get-roles', request);
    }

    paging(request: any = null): Observable<any> {
        return this.http.get('project/paging', request);
    }

    getById(request: any): Observable<any> {
        return this.http.get('project/get-by-id', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('project/get-all', request);
    }

    getAllByEmployee(request: any = null): Observable<any> {
        return this.http.get('project/get-all-by-employee', request);
    }

    getPagingByEmployee(request: any = null): Observable<any> {
        return this.http.get('project/get-paging-by-employee', request);
    }

    pagingEmployeeInDepartment(request: any = null): Observable<any> {
        return this.http.get('project/paging-employee-in-project', request);
    }

    pagingEmployeeNotInDepartment(request: any = null): Observable<any> {
        return this.http.get('project/paging-employee-not-in-project', request);
    }
    update(request: any): Observable<any> {
        return this.http.put('project/update', request);
    }

    updateDepartmentBasicInfo(request: any): Observable<any> {
        return this.http.put('project/update-info-base', request);
    }

    removeEmployeeFromProject(request: any): Observable<any> {
        return this.http.put('project/remove-employee-in-project', request);
    }

    addEmployeeToProject(request: any): Observable<any> {
        return this.http.put('project/add-employee-in-project', request);
    }

    addMultipleEmployeeToProject(request: any): Observable<any> {
        return this.http.put('project/add-multiple-employee-in-project', request);
    }

    updateRoleEmployeeFromProject(request: any): Observable<any> {
        return this.http.put('project/update-role-employee-in-project', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.put('project/delete-soft', request);
    }





}
