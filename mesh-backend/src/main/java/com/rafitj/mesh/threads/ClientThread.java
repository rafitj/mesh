package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import com.rafitj.mesh.controller.projections.ClientEntityProjectionDTO;
import com.rafitj.mesh.io.entities.PingEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public class ClientThread extends ResourceThread {

    private ClientEntityProjectionDTO client;

    public ClientThread(ClientEntityProjectionDTO client, SimpMessageSendingOperations sendingOperations,
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
            if (client.getOriginResource() && client.getRelationshipIds() != null) {
             for (int i = 0; i < client.getRelationshipIds().size(); ++i) {
                    try {
                        PingEntity p = new PingEntity();
                        p.setId(client.getRelationshipIds().get(i));
                        p.setLatency(client.getLatencies().get(i));
                        p.setSrcId(client.getId());
                        p.setTargetId(client.getTargets().get(i));
                        p.setMsg("Client thread message");
                        simulation.getResourceThreads().get(client.getTargets().get(i)).addPing(p);
                        Thread.sleep(client.getLatencies().get(i)*1000);
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
