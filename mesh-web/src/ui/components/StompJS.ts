import { Client, StompSubscription } from '@stomp/stompjs';

export const CreateStompClient = () => {
  const client = new Client({
    brokerURL: 'ws://localhost:8090/test',
    // connectHeaders: {
    //   login: 'user',
    //   passcode: 'password',
    // },
    debug: function (str) {
      console.log('DEBUG: ', str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  let subscription: StompSubscription;
  const callback = (m: any) => {
    console.log('MESSAGE: ', JSON.parse(m.body));
  };
  client.onConnect = (frame) => {
    console.log(frame);
    subscription = client.subscribe('/topic/public', callback);
  };
  client.onStompError = (frame) => {
    console.log('Broker reported error: ' + frame.headers.message);
    console.log('Additional details: ' + frame.body);
  };
  client.onDisconnect = (frame) => {
    if (subscription) {
      subscription.unsubscribe();
    }
  };
  client.activate();
};
