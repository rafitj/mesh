package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.ServerEntityProjection;
import com.rafitj.mesh.controller.projections.ServerEntityProjectionDTO;
import com.rafitj.mesh.io.entities.PingEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public class ServerThread extends ResourceThread {

    private ServerEntityProjectionDTO server;

    public ServerThread(ServerEntityProjectionDTO server, SimpMessageSendingOperations sendingOperations,
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
            if (server.getOriginResource() && server.getRelationshipIds() != null) {
                for (int i = 0; i < server.getRelationshipIds().size(); ++i) {
                    try {
                        PingEntity p = new PingEntity();
                        p.setId(server.getRelationshipIds().get(i));
                        p.setLatency(server.getLatencies().get(i));
                        p.setSrcId(server.getId());
                        p.setTargetId(server.getTargets().get(i));
                        p.setMsg("Server thread message");
                        simulation.getResourceThreads().get(server.getTargets().get(i)).addPing(p);
                        Thread.sleep(server.getLatencies().get(i)*1000);
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
