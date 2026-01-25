import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DelegationService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }

    create(request: any): Observable<any> {
        return this.http.post('delegation/create', request);
    }

    paging(request: any = null): Observable<any> {
        return this.http.get('delegation/paging', request);
    }

    getById(request: any): Observable<any> {
        return this.http.get('delegation/get-by-id', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('delegation/get-all', request);
    }

    getAllByEmployeeDelegation(request: any = null): Observable<any> {
        return this.http.get('delegation/get-all-by-employee-delegation', request);
    }
    
    update(request: any): Observable<any> {
        return this.http.put('delegation/update', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.put('delegation/delete-soft', request);
    }


    


}
