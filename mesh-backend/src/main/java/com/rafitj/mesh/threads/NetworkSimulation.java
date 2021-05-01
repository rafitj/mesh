package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class NetworkSimulation {
    private boolean isActive;
    ServerRepo serverRepo;
    ClientRepo clientRepo;
    DatabaseRepo databaseRepo;
    private List<ServerThread> serverThreads;
    private List<ClientThread> clientThreads;
    private List<DatabaseThread> dbThreads;
    private Map<String,ResourceThread> resourceThreads;
    private SimpMessageSendingOperations sendingOperations;

    public Map<String, ResourceThread> getResourceThreads() {
        return resourceThreads;
    }

    public void setResourceThreads(Map<String, ResourceThread> resourceThreads) {
        this.resourceThreads = resourceThreads;
    }

    public NetworkSimulation(SimpMessageSendingOperations sendingOperations, ServerRepo serverRepo,
                             ClientRepo clientRepo, DatabaseRepo databaseRepo) {
        this.sendingOperations = sendingOperations;
        this.serverRepo = serverRepo;
        this.clientRepo = clientRepo;
        this.databaseRepo = databaseRepo;
        this.resourceThreads = new HashMap<>();
        this.serverThreads = new ArrayList<>();
        this.clientThreads = new ArrayList<>();
        this.dbThreads = new ArrayList<>();
    }

    public void startSimulation(String projectId){
        initSimulation(projectId);
        System.out.print(resourceThreads.values().size());
        for (ResourceThread thread: resourceThreads.values()) {
            thread.start();
        }
    }

    public void stopSimulation(){
        for (ResourceThread thread: resourceThreads.values()) {
            thread.interrupt();
        }
    }

    private void initSimulation(String projectId) {
        List<ServerEntityProjectionDTO> serverConnections = serverRepo.getServersByProjectId(projectId);
        for (ServerEntityProjectionDTO serverConnection: serverConnections) {
            ServerThread serverThread = new ServerThread(serverConnection, sendingOperations, this);
            serverThreads.add(serverThread);
            resourceThreads.put(serverConnection.getId(),serverThread);
        }
        List<ClientEntityProjectionDTO> clientConnections = clientRepo.getClientsByProjectId(projectId);
        for (ClientEntityProjectionDTO clientConnection: clientConnections) {
            ClientThread clientThread = new ClientThread(clientConnection, sendingOperations, this);
            clientThreads.add(clientThread);
            resourceThreads.put(clientConnection.getId(),clientThread);
        }
        List<DatabaseProjectionDTO> databaseConnections = databaseRepo.getDatabasesByProjectId(projectId);
        for (DatabaseProjectionDTO databaseConnection: databaseConnections) {
            DatabaseThread dbThread = new DatabaseThread(databaseConnection, sendingOperations, this);
            dbThreads.add(dbThread);
            resourceThreads.put(databaseConnection.getId(),dbThread);
        }
    }

}
