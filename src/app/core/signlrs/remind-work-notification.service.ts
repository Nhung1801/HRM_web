import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AuthToken } from './../models/identity/auth-token.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RemindWorkNotificationService {
    // private hubConnection!: signalR.HubConnection;
    private baseUrl = environment.baseSignLRUrl;

    private hubConnection!: signalR.HubConnection;
    // private baseUrl = 'https://localhost:7100';
    private subscriptionStatusSubject = new BehaviorSubject<any>(null); // Subject để phát dữ liệu từ SignalR
    private subscriptionRemindStatusSubject = new BehaviorSubject<any>(null); // Subject để phát dữ liệu từ SignalR

    public subscriptionStatus$ = this.subscriptionStatusSubject.asObservable(); // Observable để các component subscribe
    public subscriptionRemindStatus$ =
        this.subscriptionRemindStatusSubject.asObservable(); // Observable để các component subscribe
    public async startConnection() {
        try {
            // Lấy token từ localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Auth token not found in localStorage.');
            }
            const tokenData = JSON.parse(token);
            // Tạo kết nối SignalR
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${this.baseUrl}/hubs/remind-work-notification-hub`, {
                    accessTokenFactory: () => tokenData.accessToken,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                    withCredentials: true,
                })
                .build();

            await this.hubConnection
                .start()
                .then(() => {
                    console.log('Connection started');
                    this.listenSubscriptionStatus(); // lắng nghe sự kiện sau khi kết nối
                    this.receiveRemindWorkNotification();
                })
                .catch((err) =>
                    console.log('Error while starting connection: ' + err)
                );
        } catch (error) {
            console.error('Error while starting SignalR connection:', error);
            setTimeout(() => this.startConnection(), 5000);
        }

        // Xử lý khi kết nối bị đóng
        this.hubConnection.onclose((error) => {
            console.error('SignalR connection closed:', error);
            setTimeout(() => this.startConnection(), 5000); // Thử kết nối lại
        });
    }

    public listenSubscriptionStatus() {
        this.hubConnection.on('ReceiveWorkNotification', (data: any) => {
            console.log('received subscription status', data);
            this.subscriptionStatusSubject.next(data);
        });
    }

    public receiveRemindWorkNotification() {
        this.hubConnection.on('ReceiveRemindWorkNotification', (data: any) => {
            console.log('received subscription status', data);
            this.subscriptionRemindStatusSubject.next(data);
        });
    }
}
