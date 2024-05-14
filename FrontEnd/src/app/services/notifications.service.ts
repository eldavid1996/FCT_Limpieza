import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  urlBase = environment.gatewayUrl;
  private hubConnection: HubConnection;
  public notifications$: Subject<string> = new Subject<string>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.urlBase + 'Taskhistory/notificationHub/notificationHub') // URL del hub SignalR
      .build();

    this.hubConnection.on('ReceiveNotification', (data: any) => {
      this.notifications$.next(data);
    });

    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('rol') === "true") {
          this.hubConnection
          .start()
          .then(() =>
            console.log('Conexión establecida con el servidor de SignalR')
          )
          .catch((err) =>
            console.error('Error al conectar con el servidor de SignalR:', err)
          );
        }
      }
    }

  }
}
