import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrganiStructTypeService {

  constructor(private httpld: HttpLoadingService, private http: HttpClient) { }


  getAllOrganiStructType( resquest: any):Observable<any>{
    return this.http.get('/organization-type/get-all', resquest)
  }
  createOrganiStruct(resquest : any): Observable<any>{
    return this.http.post('/organization/create', resquest)
  }
  getOrganiStructType( Id: number) : Observable<any> {
    return this.http.get(`/organization/get-select?Id=${Id}`)
  }
  createOrganiStructType(resquest: any):Observable<any>{
    return this.http.post('/organization-type/create', resquest)
  }
  getEmployee ( resquest : any) :Observable<any>{
    return this.http.get('/employee/paging',resquest)
  }
  getAllOrganiStruct( resquest :any):Observable<any>{
    return this.http.get('/organization/paging', resquest)
  }
  getByIdOrganiStruct (Id: number):Observable<any>{
    return this.http.get(`/organization/get-by-id?Id=${Id}`)
  }
  updateOrganiStruct (Id: number , resquest: any ):Observable<any>{
    return this.http.put(`/organization/update?id=${Id}`, resquest)
  }
}
