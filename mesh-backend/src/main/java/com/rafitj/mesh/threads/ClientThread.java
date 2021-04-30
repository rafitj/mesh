package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public class ClientThread extends ResourceThread {

    private ClientEntityProjection client;

    public ClientThread(ClientEntityProjection client, SimpMessageSendingOperations sendingOperations,
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
            if (client.getIsOriginResource()) {
                System.out.println(client.getConnections().size());
//                for (ConnectionProjection c : client.getConnections()) {
//                    System.out.println("HELLO");
//                    try {
//                        PingEntity p = new PingEntity();
//                        p.setId((int) c.getRelationId());
//                        p.setLatency(c.getLatency());
//                        p.setSrcId(c.getSrc());
//                        p.setTargetId(c.getTarget());
//                        p.setMsg("Client thread message");
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
