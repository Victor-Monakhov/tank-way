import {CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Subject} from "rxjs";

export class WebSocket{
  private stompClient: CompatClient;
  public response: Subject<any> = new Subject<any>();
  public isConnected: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  private onMessageReceived(response: any): void {
    this.response.next(JSON.parse(response.body));
  }

  private errorCallBack(error, endpoint, topic): void {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect(endpoint, topic);
    }, 5000);
  }

  public connect(endpoint, topic): void{
    let socket = () => new SockJS(endpoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = ()=>{};
    this.stompClient.connect({}, (frame) => {
      this.isConnected.next(true);
      const id = frame['headers']['user-name'];
      this.stompClient.subscribe(topic + `/${id}`,  (response) => {
        this.onMessageReceived(response);
      });
    }, (error) => this.errorCallBack(error, endpoint, topic));
  }

  public disconnect(): void{
    if (this.stompClient !== null) {
      this.isConnected.next(false);
      this.stompClient.disconnect();
    }
  }

  public sendMessage(path: string, request: any){
    this.stompClient.send(path, {}, JSON.stringify(request));
  }
}
