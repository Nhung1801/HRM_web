import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TimekeepingLocationService {

  constructor(private httpld: HttpLoadingService, private http: HttpClient) { }
  getAll (resquest: any ):Observable<any>{
    return this.http.get("/timekeeping-location/paging",resquest)
  }
  getByID(id:number):Observable<any>{
    return this.http.get(`/timekeeping-location/get-by-id?Id=${id}`)
  }
  createLocation ( resquest: any ):Observable<any>{
    return this.http.post("/timekeeping-location/create", resquest)
  }
  updateLocation (id:number, resquest: any ):Observable<any>{
    return this.http.put(`/timekeeping-location/update?id=${id}`, resquest)
  }
  deleteLocation (id:number ):Observable<any>{
    return this.http.delete(`/timekeeping-location/delete?id=${id}`)
  }
  getLocationID(idLocation: number, resquest:any):Observable<any>{
    return this.http.get(`/apply-organization/paging?TimekeepingLocationId=${idLocation}`, resquest)
  }

}
