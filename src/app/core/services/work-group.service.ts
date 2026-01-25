import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class WorkGroupService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('work/paging', request);
    }

    getAll(request: any = null): Observable<any> {
        return this.http.get('work/get-all', request);
    }

    //  thêm mới nhóm công việc
    createWorkGroup(request: any): Observable<any> {
        return this.http.post('group-work/create', request);
    }
    //  lấy danh sách nhóm công việc theo dự án
    getWorkGroupByProjectID(request: any): Observable<any> {
        return this.http.get("group-work/paging", request);
    }
    //  lấy thông tin nhóm công việc theo id
    getWorkGroupByID(Id: number): Observable<any> {
        return this.http.get(`group-work/get-by-id?id=${Id}`, {});
    }
    //  cập nhật nhóm công việc
    updateWorkGroup(Id: number, request: any): Observable<any> {
        return this.http.put(`group-work/update?id=${Id}`, request);
    }
    //  xóa nhóm công việc
    deleteWorkGroup(Id: number): Observable<any> {
        return this.http.put(`group-work/delete?id=${Id}`,{});
    }
}
