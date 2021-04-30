package com.rafitj.mesh.threads;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import com.rafitj.mesh.controller.projections.DatabaseEntityProjection;
import com.rafitj.mesh.controller.projections.ServerEntityProjection;
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
        Collection<ServerEntityProjection> serverConnections = serverRepo.getServersByProjectId(projectId);
        for (ServerEntityProjection serverConnection: serverConnections) {
            System.out.println(serverConnection.getConnections().size());
            ServerThread serverThread = new ServerThread(serverConnection, sendingOperations, this);
            serverThreads.add(serverThread);
            resourceThreads.put(serverConnection.getId(),serverThread);
        }
        Collection<ClientEntityProjection> clientConnections = clientRepo.getClientsByProjectId(projectId);
        for (ClientEntityProjection clientConnection: clientConnections) {
            System.out.println(clientConnection.getConnections().size());
            ClientThread clientThread = new ClientThread(clientConnection, sendingOperations, this);
            clientThreads.add(clientThread);
            resourceThreads.put(clientConnection.getId(),clientThread);
        }
        Collection<DatabaseEntityProjection> databaseConnections = databaseRepo.getDatabasesByProjectId(projectId);
        for (DatabaseEntityProjection databaseConnection: databaseConnections) {
            System.out.println(databaseConnection.getConnections().size());
            DatabaseThread dbThread = new DatabaseThread(databaseConnection, sendingOperations, this);
            dbThreads.add(dbThread);
            resourceThreads.put(databaseConnection.getId(),dbThread);
        }
    }

}
