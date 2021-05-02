package com.rafitj.mesh.threads;

import com.rafitj.mesh.io.entities.PingEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

public abstract class ResourceThread extends Thread {
    protected SimpMessageSendingOperations sendingOperations;
    protected NetworkSimulation simulation;
    protected final Queue<PingEntity> pingQ;
    protected int capacity;

    protected ResourceThread(SimpMessageSendingOperations sendingOperations,
                           NetworkSimulation simulation, int capacity) {
        this.sendingOperations = sendingOperations;
        this.simulation = simulation;
        this.pingQ = new ConcurrentLinkedQueue<PingEntity>();
        this.capacity = capacity;
    }

    protected void addPing(PingEntity p) throws InterruptedException {
        synchronized (pingQ) {
            while(pingQ.size() == capacity) {
                wait();
            }
            pingQ.add(p);
            System.out.printf("PING ADDED TO %s %n", p.getTarget());
            sendingOperations.convertAndSend("/topic/public", p);
        }
    }

    protected void  acknowledgePing() {
        synchronized (pingQ) {
            PingEntity p = pingQ.poll();
            if (p != null) {
                System.out.printf("PING ACK BY %s %n", p.getSrc());
                sendingOperations.convertAndSend("/topic/public", p);
            }
        }
    }
}
