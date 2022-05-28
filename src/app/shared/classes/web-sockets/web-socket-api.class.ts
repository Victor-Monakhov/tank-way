import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {WebSocket} from "./web-socket.class";

export class WebSocketAPI {
  private stompClient: any;
  private webSocket: WebSocket;
  constructor(webSocket: WebSocket){
    this.webSocket = webSocket;
  }
  _connect() {
    let socket = () => new SockJS(this.webSocket.endpoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = ()=>{};
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.webSocket.isConnected.next(true);
      const id = frame['headers']['user-name'];
      _this.stompClient.subscribe(_this.webSocket.topic + `/${id}`,  (response) => {
        _this.onMessageReceived(response);
      });
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.webSocket.isConnected.next(false);
      this.stompClient.disconnect();
    }
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(path: string, request: string) {
    this.stompClient.send(path, {}, JSON.stringify(request));
  }

  onMessageReceived(response: any) {
    this.webSocket.handleMessage(JSON.parse(response.body));
  }
}
