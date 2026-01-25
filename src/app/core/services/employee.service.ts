import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpLoadingService, private httpld: HttpClient) { }

  getEmployees(request: any = null): Observable<any> {
    return this.http.get('employee/paging', request);
  }

  paging(request: any = null): Observable<any> {
    return this.http.get('employee/paging', request);
  }

  getById(request: any = null): Observable<any> {
    return this.http.get('employee/get-by-id', request);
  }

  getEmployeesByBirthMonth(): Observable<any> {
    const currentMonth = new Date().getMonth() + 1; 
    return this.httpld.get(`/employee/paging?DateOfMonth=${1}`);
  }
  
}
