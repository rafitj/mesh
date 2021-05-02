package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjectionDTO;
import com.rafitj.mesh.io.dto.shared.DatabaseDTO;
import org.springframework.messaging.simp.SimpMessageSendingOperations;


public class DatabaseThread extends ResourceThread {

    private DatabaseDTO database;

    public DatabaseThread(DatabaseDTO database, SimpMessageSendingOperations sendingOperations,
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
