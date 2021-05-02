package com.rafitj.mesh.threads;

import com.rafitj.mesh.io.dto.shared.ClientDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.entities.PingEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public class ClientThread extends ResourceThread {

    private ClientDTO client;

    public ClientThread(ClientDTO client, SimpMessageSendingOperations sendingOperations,
                        NetworkSimulation simulation) {
        super(sendingOperations, simulation, Integer.MAX_VALUE);
        this.client = client;
    }

    public void run() {
        while(!Thread.interrupted()) {
            System.out.printf("Client thread %s running %n", client.getId());
            // Acknowledge ping
            acknowledgePing();
            // Send ping
            if (client.getOriginResource() && client.getConnections() != null) {
                for (ConnectionDTO connection : client.getConnections()) {
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
