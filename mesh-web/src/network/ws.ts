import { Client, StompSubscription } from '@stomp/stompjs';

export enum MSG_TYPE {
  UNKNOWN = '',
  PING = 'PING',
  ACTION = 'ACTION',
  STATS = 'STATS',
}

export class NetworkWS {
  client: Client;
  destination: string = '/topic/public';
  constructor(wsHandler: (m: any) => void) {
    let subscription: StompSubscription;
    this.client = new Client({
      brokerURL: 'ws://localhost:8090/mesh',
      reconnectDelay: 10000,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 5000,
      onConnect: (frame) => {
        // console.log(frame);
        subscription = this.client.subscribe(this.destination, wsHandler);
      },
      onStompError: (frame) => {
        // console.log('Broker reported error: ' + frame.headers.message);
        // console.log('Additional details: ' + frame.body);
      },
      onDisconnect: (frame) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      },
    });
  }
  activate() {
    this.client.activate();
  }
  pauseSimulation() {
    const tx = this.client.begin();
    this.client.publish({
      destination: '/app/pause',
      headers: { receipt: tx.id },
    });
    tx.commit();
  }
  playSimulation() {
    const tx = this.client.begin();
    this.client.publish({
      destination: '/app/play',
      headers: { receipt: tx.id },
    });
    tx.commit();
  }
  resetSimulation() {
    const tx = this.client.begin();
    this.client.publish({
      destination: '/app/reset',
      headers: { receipt: tx.id },
    });
    tx.commit();
  }
}
