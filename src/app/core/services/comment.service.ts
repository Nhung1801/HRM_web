import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }

    create(request: any): Observable<any> {
        return this.http.post('comment/create', request);
    }

    paging(request: any = null): Observable<any> {
        return this.http.get('comment/paging', request);
    }

    getById(request: any): Observable<any> {
        return this.http.get('comment/get-by-id', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('comment/get-all', request);
    }

    update(request: any): Observable<any> {
        return this.http.put('comment/update', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.put('comment/delete-soft', request);
    }



}
