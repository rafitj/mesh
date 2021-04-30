package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.ServerEntityProjection;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public class ServerThread extends ResourceThread {

    private ServerEntityProjection server;

    public ServerThread(ServerEntityProjection server, SimpMessageSendingOperations sendingOperations,
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
            if (server.getIsOriginResource()) {
//                for (ConnectionProjection c : server.getConnections()) {
//                    try {
//                        PingEntity p = new PingEntity();
//                        p.setId((int) c.getRelationId());
//                        p.setLatency(c.getLatency());
//                        p.setSrcId(c.getSrc());
//                        p.setTargetId(c.getTarget());
//                        p.setMsg("Server thread message");
//                        simulation.getResourceThreads().get(c.getTarget()).addPing(p);
//                        Thread.sleep(c.getLatency()*1000);
//                    } catch (InterruptedException e) {
//                        Thread.currentThread().interrupt();
//                    }
//                }
            }
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
