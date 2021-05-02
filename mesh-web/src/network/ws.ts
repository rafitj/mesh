import { Client, StompSubscription } from '@stomp/stompjs';

export enum MSG_TYPE {
  UNKNOWN,
  PING,
  ACTION,
  STATS,
}

export class NetworkWS {
  client: Client;
  constructor(){
    let subscription: StompSubscription;
    this.client = new Client({
      brokerURL: 'ws://localhost:8090/test',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log(frame);
        subscription = this.client.subscribe('/topic/public', this.msgHandler);
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers.message);
        console.log('Additional details: ' + frame.body);
      },
      onDisconnect: (frame) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    });
    this.client.activate();
  }
  msgHandler = (m: any) => {
    try {
      const msg = JSON.parse(m.body)
      if (msg.type === MSG_TYPE.PING) {
       console.log(msg) 
      }
    } catch {
      console.log("Something went wrong...");
    }
  };
}
