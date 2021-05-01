package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjection;
import com.rafitj.mesh.controller.projections.DatabaseProjectionDTO;
import org.springframework.messaging.simp.SimpMessageSendingOperations;


public class DatabaseThread extends ResourceThread {

    private DatabaseProjectionDTO database;

    public DatabaseThread(DatabaseProjectionDTO database, SimpMessageSendingOperations sendingOperations,
                        NetworkSimulation simulation) {
        super(sendingOperations, simulation, 1);
        this.database = database;
    }

    public void run() {
        while(!Thread.interrupted()) {
            System.out.printf("DB thread %s running %n", database.getId());
            // Acknowledge ping
            acknowledgePing();
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}