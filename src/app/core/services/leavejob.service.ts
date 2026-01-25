import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Header } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class leavejob {
    constructor(private http: HttpLoadingService, private httpld: HttpClient) { }

    //thiết lập với sửa quy định nghỉ
    createleavejob(request: any): Observable<any> {
        return this.http.post('general-leave-regulation/upsert', request);
    }

    //Hiển thị ra quy định nghỉ vừa thiết lập
    getIDleavejob(id: number, request: any): Observable<any> {
        return this.http.get(`general-leave-regulation/get-by-id?id=${id}`, request);
    }

    //lấy ra danh sách loại nghỉ
    getTypeOfLeave(request: any): Observable<any> {
        return this.http.get('type-of-leave/paging', request);
    }

    //xóa item trong danh sách loại nghỉ
    deleteItemLeave(id: number): Observable<any> {
        return this.http.delete(`type-of-leave/delete?id=${id}`);
    }

    //Thêm loại nghỉ
    createLeaveType(request: any): Observable<any> {
        return this.http.post('type-of-leave/create', request);
    }

    updateLeaveType(id: number, request: any): Observable<any> {
        return this.http.put(`type-of-leave/update?id=${id}`, request);
    }
}