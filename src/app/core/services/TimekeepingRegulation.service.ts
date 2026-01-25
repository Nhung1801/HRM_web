import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TimekeepingService {

  constructor(private httpld: HttpLoadingService, private http: HttpClient) { }
  getOraganiID ( id: number ):Observable<any>{
    return this.http.get(`/timekeeping-regulation/get-by-organization?organizationId=${id}`)
  }
  updateTimeKeepig ( resquest: any ):Observable<any>{
    return this.http.post("/timekeeping-regulation/upsert", resquest)
  }
}
