import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
  providedIn: 'root'
})
export class StaffDetailService {

  constructor(private http: HttpLoadingService) { }
  getPaging(request: any = null): Observable<any> {
    return this.http.get('detail-timesheet/paging', request);
  }

  getSelect(request: any = null): Observable<any> {
    return this.http.get('detail-timesheet/get-select', request);
  }

  getById(request: any = null): Observable<any> {
    return this.http.get('detail-timesheet/get-by-id', request);
  }

  create(request: any): Observable<any> {
    return this.http.post('detail-timesheet/create', request);
  }

  update(shiftWorkId:number, request: any): Observable<any> {
    return this.http.put(`detail-timesheet/update?shiftWorkId=${shiftWorkId}`, request);
  }
  updateLock(shiftWorkId:number, request: any): Observable<any> {
    return this.http.put(`detail-timesheet/lock?shiftWorkId=${shiftWorkId}`, request);
  }
}
