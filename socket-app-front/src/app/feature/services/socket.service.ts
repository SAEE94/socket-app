import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private webSocketEndPoint: string = environment.backendurl + 'ws';
  private stompClient: any;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.stompClient = Stomp.over(new SockJS(this.webSocketEndPoint));
    await this.stompClient.connect({}, () => { console.log('socket connection successful') }, this.errorCallBack);
  };

  public listenUserCreated(event: string, callback) {
    this.stompClient.subscribe(event, callback);
  }

  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  private errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 3000);
  }


  public send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }
}