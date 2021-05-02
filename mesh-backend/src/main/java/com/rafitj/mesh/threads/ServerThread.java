package com.rafitj.mesh.threads;

import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.ServerDTO;
import com.rafitj.mesh.io.entities.PingEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public class ServerThread extends ResourceThread {

    private ServerDTO server;

    public ServerThread(ServerDTO server, SimpMessageSendingOperations sendingOperations,
                        NetworkSimulation simulation) {
        super(sendingOperations, simulation, 1);
        this.server = server;
    }

    public void run() {
        while(!Thread.interrupted()) {
            System.out.printf("Server thread %s running %n", server.getId());
            // Acknowledge ping
            acknowledgePing();
            // Send ping
            if (server.getOriginResource() && server.getConnections() != null) {
                for (ConnectionDTO connection : server.getConnections()) {
                    try {
                        PingEntity p = new PingEntity(connection);
                        p.setMsg("Client thread message");
                        simulation.getResourceThreads().get(connection.getTarget()).addPing(p);
                        Thread.sleep(connection.getLatency()*1000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
