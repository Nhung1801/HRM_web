import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LeaveApplicationService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }

    create(request: any): Observable<any> {
        return this.http.post('leave-application/create', request);
    }

    paging(request: any = null): Observable<any> {
        return this.http.get('leave-application/paging', request);
    }

    getById(request: any): Observable<any> {
        return this.http.get('leave-application/get-by-id', request);
    }
    getTotalNumberOfDaysOff(request: any): Observable<any> {
        return this.http.get('leave-application/get-total-number-of-days-off', request);
    }
    getCountScheduledDayOffs(request: any): Observable<any> {
        return this.http.get('leave-application/get-count-scheduled-day-offs', request);
    }
    update(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'leave-application/update',
            dataQueryParams,
            dataBody
        );
    }

    updateStatus(
        dataQueryParams: any,
        dataBody: any
    ): Observable<any> {
        return this.http.putBodyAndQueryParams(
            'leave-application/update-status',
            dataQueryParams,
            dataBody
        );
    }

    updateStatusMultiple(request: any): Observable<any> {
        return this.http.put('leave-application/update-status-multiple', request);
    }


    getTypeOfLeaveEmployee(request: any = null): Observable<any> {
        return this.http.get('type-of-leave-employee/get-or-create', request);
    }


    getLeaveData(): Observable<any> {
        const fakeApiData = {
            "status": true,
            "message": "Successful",
            "data": {
                "items": [
                    {
                        "id": 1,
                        "employeeId": 1992,
                        "startDate": "2024-12-24T02:19:06.716328",
                        "endDate": "2024-12-28T02:19:06.716328",
                        "numberOfDays": 4,
                        "typeOfLeaveId": 1,
                        "salaryPercentage": 72,
                        "reasonForLeave": "Reason for leave 1",
                        "note": "Note 1",
                        "status": 1,
                        "leaveApplicationApprovers": [
                            {
                                "leaveApplicationId": 1,
                                "approverId": 189,
                                "approver": {
                                    "id": 193,
                                    "personalEmail": "approver1@example.com",
                                    "avatarUrl": "https://example.com/avatar/1.png",
                                    "employeeCode": "EMP1000",
                                    "lastName": "LastNameA1",
                                    "firstName": "FirstNameA1",
                                    "staffTitle": {
                                        "id": 5,
                                        "staffTitleName": "TitleA1"
                                    }
                                }
                            }
                        ],
                        "leaveApplicationReplacements": [
                            {
                                "leaveApplicationId": 1,
                                "replacementId": 352,
                                "replacement": {
                                    "id": 377,
                                    "personalEmail": "replacement1@example.com",
                                    "avatarUrl": "https://example.com/avatar/10.png",
                                    "employeeCode": "EMP2000",
                                    "lastName": "LastNameR1",
                                    "firstName": "FirstNameR1",
                                    "staffTitle": {
                                        "id": 9,
                                        "staffTitleName": "TitleR1"
                                    }
                                }
                            }
                        ],
                        "leaveApplicationRelatedPeople": [],
                        "typeOfLeave": {
                            "id": 4,
                            "organizationId": 16230,
                            "name": "Type 1",
                            "salaryRate": 79,
                            "maximumNumberOfDayOff": 27,
                            "note": "Type note 1"
                        },
                        "employee": {
                            "id": 2210,
                            "personalEmail": "employee1@example.com",
                            "avatarUrl": "https://example.com/avatar/emp1.png",
                            "employeeCode": "EMP3000",
                            "lastName": "LastNameE1",
                            "firstName": "FirstNameE1",
                            "staffTitle": {
                                "id": 14,
                                "staffTitleName": "StaffTitleE1"
                            }
                        },
                        "createdBy": 5,
                        "createdName": "CreatorName1",
                        "createdAt": "2024-12-17T02:19:06.716328",
                        "updatedBy": 1,
                        "updatedName": "UpdaterName1",
                        "updatedAt": "2024-12-17T02:19:06.716328"
                    },
                    {
                        "id": 3,
                        "employeeId": 1992,
                        "startDate": "2024-12-24T02:19:06.716328",
                        "endDate": "2024-12-28T02:19:06.716328",
                        "numberOfDays": 4,
                        "typeOfLeaveId": 1,
                        "salaryPercentage": 72,
                        "reasonForLeave": "Reason for leave 1",
                        "note": "Note 1",
                        "status": 2,
                        "leaveApplicationApprovers": [
                            {
                                "leaveApplicationId": 1,
                                "approverId": 189,
                                "approver": {
                                    "id": 193,
                                    "personalEmail": "approver1@example.com",
                                    "avatarUrl": "https://example.com/avatar/1.png",
                                    "employeeCode": "EMP1000",
                                    "lastName": "LastNameA1",
                                    "firstName": "FirstNameA1",
                                    "staffTitle": {
                                        "id": 5,
                                        "staffTitleName": "TitleA1"
                                    }
                                }
                            }
                        ],
                        "leaveApplicationReplacements": [
                            {
                                "leaveApplicationId": 1,
                                "replacementId": 352,
                                "replacement": {
                                    "id": 377,
                                    "personalEmail": "replacement1@example.com",
                                    "avatarUrl": "https://example.com/avatar/10.png",
                                    "employeeCode": "EMP2000",
                                    "lastName": "LastNameR1",
                                    "firstName": "FirstNameR1",
                                    "staffTitle": {
                                        "id": 9,
                                        "staffTitleName": "TitleR1"
                                    }
                                }
                            }
                        ],
                        "leaveApplicationRelatedPeople": [],
                        "typeOfLeave": {
                            "id": 4,
                            "organizationId": 16230,
                            "name": "Type 1",
                            "salaryRate": 79,
                            "maximumNumberOfDayOff": 27,
                            "note": "Type note 1"
                        },
                        "employee": {
                            "id": 2210,
                            "personalEmail": "employee1@example.com",
                            "avatarUrl": "https://example.com/avatar/emp1.png",
                            "employeeCode": "EMP3000",
                            "lastName": "LastNameE1",
                            "firstName": "FirstNameE1",
                            "staffTitle": {
                                "id": 14,
                                "staffTitleName": "StaffTitleE1"
                            }
                        },
                        "createdBy": 5,
                        "createdName": "CreatorName1",
                        "createdAt": "2024-12-17T02:19:06.716328",
                        "updatedBy": 1,
                        "updatedName": "UpdaterName1",
                        "updatedAt": "2024-12-17T02:19:06.716328"
                    },
                    {
                        "id": 2,
                        "employeeId": 1992,
                        "startDate": "2024-12-24T02:19:06.716328",
                        "endDate": "2024-12-28T02:19:06.716328",
                        "numberOfDays": 4,
                        "typeOfLeaveId": 1,
                        "salaryPercentage": 72,
                        "reasonForLeave": "Reason for leave 1",
                        "note": "Note 1",
                        "status": 0,
                        "leaveApplicationApprovers": [
                            {
                                "leaveApplicationId": 1,
                                "approverId": 189,
                                "approver": {
                                    "id": 193,
                                    "personalEmail": "approver1@example.com",
                                    "avatarUrl": "https://example.com/avatar/1.png",
                                    "employeeCode": "EMP1000",
                                    "lastName": "LastNameA1",
                                    "firstName": "FirstNameA1",
                                    "staffTitle": {
                                        "id": 5,
                                        "staffTitleName": "TitleA1"
                                    }
                                }
                            }
                        ],
                        "leaveApplicationReplacements": [
                            {
                                "leaveApplicationId": 1,
                                "replacementId": 352,
                                "replacement": {
                                    "id": 377,
                                    "personalEmail": "replacement1@example.com",
                                    "avatarUrl": "https://example.com/avatar/10.png",
                                    "employeeCode": "EMP2000",
                                    "lastName": "LastNameR1",
                                    "firstName": "FirstNameR1",
                                    "staffTitle": {
                                        "id": 9,
                                        "staffTitleName": "TitleR1"
                                    }
                                }
                            }
                        ],
                        "leaveApplicationRelatedPeople": [],
                        "typeOfLeave": {
                            "id": 4,
                            "organizationId": 16230,
                            "name": "Type 1",
                            "salaryRate": 79,
                            "maximumNumberOfDayOff": 27,
                            "note": "Type note 1"
                        },
                        "employee": {
                            "id": 2210,
                            "personalEmail": "employee1@example.com",
                            "avatarUrl": "https://example.com/avatar/emp1.png",
                            "employeeCode": "EMP3000",
                            "lastName": "LastNameE1",
                            "firstName": "FirstNameE1",
                            "staffTitle": {
                                "id": 14,
                                "staffTitleName": "StaffTitleE1"
                            }
                        },
                        "createdBy": 5,
                        "createdName": "CreatorName1",
                        "createdAt": "2024-12-17T02:19:06.716328",
                        "updatedBy": 1,
                        "updatedName": "UpdaterName1",
                        "updatedAt": "2024-12-17T02:19:06.716328"
                    },
                    // 9 more items
                ],
                "pageIndex": 1,
                "pageSize": 10,
                "sortBy": "startDate",
                "orderBy": "asc",
                "totalRecords": 10,
                "totalPages": 1
            }
        };
        return of(fakeApiData);
    }

    updateLeaveApplication(id: number, data: any): Observable<any> {
        return this.http.put(`leave-application/update?id=${id}`, data);
      }

    deleteLeaveApplication(id: number): Observable<any> {
        return this.http.delete(`leave-application/delete?id=${id}`);
      }
}
