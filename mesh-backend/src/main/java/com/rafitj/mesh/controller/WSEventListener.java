package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.PingMessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WSEventListener {
    @Autowired
    private SimpMessageSendingOperations sendingOperations;

    @EventListener
    public void handWSSubscribeListener(SessionSubscribeEvent event) throws InterruptedException {
        System.out.println("Subscribed");
        int i = 0;
        while (i < 10) {
            PingMessageEntity pingMessageEntity = new PingMessageEntity();
            pingMessageEntity.setLatency(i);
            sendingOperations.convertAndSend("/topic/public", pingMessageEntity);
            Thread.sleep(1000);
            i+=1;
        }
    }


    @EventListener
    public void handleWSConnectListener(SessionConnectedEvent event) {
        System.out.println("Connected");
    }

    @EventListener
    public void handleWSDisconnectListener(SessionDisconnectEvent event)  {
        System.out.println("Disconnected");
    }
}
