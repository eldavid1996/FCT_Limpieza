import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private hubConnection: HubConnection;
    public notifications$: Subject<string> = new Subject<string>();

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:8562/notificationHub') // URL del hub SignalR
            .build();

        this.hubConnection.on('ReceiveNotification', (data: any) => {
            this.notifications$.next(data);
        });

        this.hubConnection.start()
            .then(() => console.log('Conexión establecida con el servidor de SignalR'))
            .catch(err => console.error('Error al conectar con el servidor de SignalR:', err));
    }
}
