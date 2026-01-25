import { NgZone, Injectable, signal, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpLoadingService } from '../https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private hubConnection!: signalR.HubConnection;
    private baseUrl = environment.baseSignLRUrl;
    //  private http = inject(HttpClient);
    //   notifications = signal<any>([]);
    private notificationsSource = new BehaviorSubject<any>(null);
    public notifications$ = this.notificationsSource.asObservable();
    constructor(private http: HttpLoadingService) {}
    async startConnection() {
        let token = JSON.parse(localStorage.getItem('authToken'));
        console.log(token);
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl + '/hubs/notification', {
                accessTokenFactory: () => token.accessToken,
            })
            .withAutomaticReconnect()
            .build();

        await this.hubConnection
            .start()
            .then(() => {})
            .catch((error) => console.log(error));
        this.receiveNotification();
    }
    stopHubConnection() {
        if (
            this.hubConnection?.state === signalR.HubConnectionState.Connected
        ) {
            this.hubConnection.stop().catch((error) => console.log(error));
        }
    }

    getNotifications(request: any = null): Observable<any> {
        return this.http.get('notifications/paging', request);
    }
    updateReadStatus(request): Observable<any> {
        return this.http.postBodyAndQueryParams(
            'notifications/update-read-status',
            request,
            null
        );
    }
    public receiveNotification() {
        this.hubConnection.on('ReceiveNotification', (notification) => {
            console.log('ReceiveNotification', notification);
            this.notificationsSource.next(notification);
        });
    }
}
