import { Injectable } from '@angular/core';
import { HttpLoadingService } from '../https/http-loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CompanyInfoService {
    constructor(private httpld: HttpLoadingService, private http: HttpClient) {}

    getCompanyById(id: number): Observable<any> {
        const endpoint = 'company/get-by-id';
        const data = { Id: id };
        return this.httpld.get(endpoint, data);
    }

    updateCompanyInfo(request: FormData, companyId: number): Observable<any> {
        const headers = new HttpHeaders();
        return this.http.put(
            `/company/update?companyId=${companyId}`,
            request,
            { headers }
        );
    }
    getAllCompany(resquest: any): Observable<any> {
        return this.http.get('/company/paging', resquest);
    }
}
