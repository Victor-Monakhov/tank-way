import {WebSocketAPI} from "./web-socket-api.class";
import {Subject} from "rxjs";

export class WebSocket{
  public webSocketAPI: WebSocketAPI;
  public response: Subject<any> = new Subject<any>();
  public isConnected: Subject<boolean> = new Subject<boolean>();
  public topic: string;
  public endpoint: string;

  constructor(endpoint: string, topic: string) {
    this.endpoint = endpoint;
    this.topic = topic;
    this.webSocketAPI = new WebSocketAPI(this);
  }

  public connect(){
    this.webSocketAPI._connect();
  }

  public disconnect(){
    this.webSocketAPI._disconnect();
  }

  public sendMessage(path: string, request: any){
    this.webSocketAPI._send(path, request);
  }

  public handleMessage(response: any){
    this.response.next(response);
  }
}
