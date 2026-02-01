import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpLoadingService, private httpld: HttpClient) { }

  getPagingAll(request: any = null): Observable<any> {
    return this.http.get('contracttype/paging', request);
  }

  getPagingContractDuration(request: any = null): Observable<any> {
    return this.http.get('contractduration/paging', request);
  }
  getPagingWorkingForm(request: any = null): Observable<any> {
    return this.http.get('workingform/paging', request);
  }

  createContractType(resquest: any): Observable<any> {
    return this.http.post('contracttype/create', resquest)
  }
  createContractDuration(resquest: any): Observable<any> {
    return this.http.post('contractduration/create', resquest)
  }
  createWorkingForm(resquest: any): Observable<any> {
    return this.http.post('workingform/create', resquest)
  }
  createAllowance(resquest: any): Observable<any> {
    return this.http.post('allowance/create', resquest)
  }

  updateContractType(Id: number, resquest: any): Observable<any> {
    return this.http.put(`contracttype/update?id=${Id}`, resquest)
  }
  updateContractDuration(Id: number, resquest: any): Observable<any> {
    return this.http.put(`contractduration/update?id=${Id}`, resquest)
  }
  updateWorkingForm(Id: number, resquest: any): Observable<any> {
    return this.http.put(`workingform/update?id=${Id}`, resquest)
  }

  exportContract(request: any = null): Observable<any> {
    return this.http.get('contract/get-all', request);
  }

  getPagingAllContract(request: any = null): Observable<any> {
    return this.http.get('contract/paging', request);
  }
  createContract(data: FormData): Observable<any> {
    return this.httpld.post<any>(`/contract/create`, data);
  }
  getByIdContract(id: number): Observable<any> {
    return this.httpld.get<any>(`/contract/get-by-id?Id=${id}`);
  }

  updateContract(id: number, request: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpld.put(`/contract/update?id=${id}`, request, { headers });
  }

  getAllowanceByIdContract(id: number): Observable<any> {
    return this.httpld.get<any>(`/allowance/get-allowance-by-contractid?Id=${id}`);
  }
  getAllowanceById(id: number): Observable<any> {
    return this.httpld.get<any>(`/allowance/get-by-id?Id=${id}`);
  }

  updateAllowance(allowanceData: any): Observable<any> {
    const url = `/allowance/update?id=${allowanceData.id}`;
    return this.httpld.put(url, allowanceData);
  }

  deleteContract(Id: any): Observable<any> {
    const url = `/contract/delete?id=${Id}`;
    return this.httpld.put(url, Id);
  }
}
