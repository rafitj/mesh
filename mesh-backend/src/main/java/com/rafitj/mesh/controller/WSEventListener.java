package com.rafitj.mesh.controller;

import com.rafitj.mesh.threads.NetworkSimulation;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WSEventListener {

    private final NetworkSimulation networkSimulation;

    public WSEventListener(NetworkSimulation networkSimulation) {
        this.networkSimulation = networkSimulation;
    }

    @EventListener
    public void handWSSubscribeListener(SessionSubscribeEvent event) {
        System.out.println("Subscribed");
    }

    @EventListener
    public void handleWSConnectListener(SessionConnectedEvent event) {
        System.out.println("Connected");
        networkSimulation.initSimulation("69");
//        networkSimulation.start();
    }

    @EventListener
    public void handleWSDisconnectListener(SessionDisconnectEvent event) {
        System.out.println("Disconnected");
        networkSimulation.stop();
    }

}
