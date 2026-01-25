import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TimekeepingUnitService {

  constructor(private httpld: HttpLoadingService, private http: HttpClient) { }

  getByIDUnit(id: number): Observable<any> {
    return this.http.get(`/apply-organization/get-by-id?Id=${id}`)
  }
  createUnit(resquest: any): Observable<any> {
    return this.http.post("/apply-organization/create", resquest)
  }
  updateUnit(id: number, resquest: any): Observable<any> {
    return this.http.put(`/apply-organization/update?id=${id}`, resquest)
  }

  getTimekeepingSettingID(id: number): Observable<any> {
    return this.http.get(`/timekeeping-setting/paging?OrganizationId=${id}`)
  }

  //api xem tổng quát chấm công
  getAllorganization(resquest: any): Observable<any> {
    return this.http.get("/apply-organization/apply-organizations", resquest)
  }

  //api xóa nội dung trong tổng quát chấm công
  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`/apply-organization/delete-apply-organization?id=${id}`);
  }
}
