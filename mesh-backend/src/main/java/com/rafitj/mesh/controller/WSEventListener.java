package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import com.rafitj.mesh.threads.NetworkSimulation;
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

    @Autowired
    ServerRepo serverRepo;

    @Autowired
    ClientRepo clientRepo;

    @Autowired
    DatabaseRepo databaseRepo;

    private NetworkSimulation networkSimulation;

    @EventListener
    public void handWSSubscribeListener(SessionSubscribeEvent event) {
        System.out.println("Subscribed");
    }


    @EventListener
    public void handleWSConnectListener(SessionConnectedEvent event) {
        System.out.println("Connected");
        networkSimulation = new NetworkSimulation(sendingOperations,serverRepo,clientRepo,databaseRepo);
        networkSimulation.startSimulation("69");
    }

    @EventListener
    public void handleWSDisconnectListener(SessionDisconnectEvent event) {
        System.out.println("Disconnected");
        networkSimulation.stopSimulation();
    }
}
