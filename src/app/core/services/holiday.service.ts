import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class HolidayService {
    constructor(private http: HttpLoadingService) {}
    getPaging(request: any = null): Observable<any> {
        return this.http.get('holiday/paging', request);
    }

    getById(request: any = null): Observable<any> {
        return this.http.get('holiday/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('holiday/create', request);
    }

    update(request: any): Observable<any> {
        return this.http.putFormData('holiday/update', request);
    }

    updateLabor(Id: number, resquest: any): Observable<any> {
        return this.http.put(`holiday/update?id=${Id}`, resquest);
    }

    updateBodyAndQueryParams(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'holiday/update',
            dataQueryParams,
            dataBody
        );
    }

    updateBodyAndQueryParamsStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'holiday/update-status',
            dataQueryParams,
            dataBody
        );
    }

    delete(request: any): Observable<any> {
        return this.http.put('holiday/delete', request);
    }

    deleteSoft(request: any): Observable<any> {
        return this.http.deleteSoft('holiday/delete', request);
    }

    deleteRange(request: any): Observable<any> {
        return this.http.put('holiday/delete-range', request);
    }

    getHolidyByYearPaging(request: any = null): Observable<any> {
        return this.http.get('work-factor/get-by-year', request);
    }

    saveWorkFactor(dataQueryParams: any, dataBody: any): Observable<any> {
        return this.http.postBodyAndQueryParams(
            'work-factor/save-work-factors',
            dataQueryParams,
            dataBody
        );
    }
    deleteHOliday(id:number):Observable<any>{
        return this.http.delete(`holiday/delete?Id=${id}`);
    }
    createHoliday(data:any):Observable<any>{
        return this.http.post('holiday/create',data);
    }
    getByIdholiday(id:number):Observable<any>{
        return this.http.get(`holiday/get-by-id?Id=${id}`,{});
    }
    updateHoliday(id :number, data:any):Observable<any>{
        return this.http.put(`holiday/update?id=${id}`,data);
    }
    checkRepeatName(name:string):Observable<any>{
        return  this.http.get(`holiday/paging?Name=${name}`,{});
    }
}
