import { NgZone, Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PresenceService {
    private hubConnection!: signalR.HubConnection;
    private baseUrl = environment.baseSignLRUrl;
    onlineUsers = signal<any>([]);
    constructor(
        private messageService: MessageService,
        private ngZone: NgZone
    ) {}
    startConnection() {
        let token = JSON.parse(localStorage.getItem('authToken'));
        console.log(token);
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.baseUrl + '/hubs/presence', {
                accessTokenFactory: () => token.accessToken,
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection.start().catch((error) => console.log(error));

        // this.hubConnection.on('UserIsOffline', (userName) => {
        //     console.log('UserIsOffline', userName);

        // });

        // this.hubConnection.on('UserIsOnline', (userName) => {
        //     console.log('UserIsOnline', userName);

        // });

        this.hubConnection.on('GetOnlineUsers', (users) => {
            console.log('userCurrent', users);
            this.onlineUsers.set(users);
        });
    }
    stopHubConnection() {
        if (
            this.hubConnection?.state === signalR.HubConnectionState.Connected
        ) {
            this.hubConnection.stop().catch((error) => console.log(error));
        }
    }
}
