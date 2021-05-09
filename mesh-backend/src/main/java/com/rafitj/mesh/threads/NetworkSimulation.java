package com.rafitj.mesh.threads;

import com.rafitj.mesh.io.dto.shared.ClientDTO;
import com.rafitj.mesh.io.dto.shared.DatabaseDTO;
import com.rafitj.mesh.io.dto.shared.ServerDTO;
import com.rafitj.mesh.service.impl.ClientServiceImpl;
import com.rafitj.mesh.service.impl.DatabaseServiceImpl;
import com.rafitj.mesh.service.impl.ServerServiceImpl;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class NetworkSimulation {
    private boolean isActive = false;
    private boolean isInitialized = false;
    private String projectId;

    private List<ServerThread> serverThreads;
    private List<ClientThread> clientThreads;
    private List<DatabaseThread> dbThreads;
    private Map<String,ResourceThread> resourceThreads;
    private SimpMessageSendingOperations sendingOperations;

    private final ServerServiceImpl serverService;
    private final DatabaseServiceImpl databaseService;
    private final ClientServiceImpl clientService;

    public NetworkSimulation(SimpMessageSendingOperations sendingOperations, ServerServiceImpl serverService,
                             DatabaseServiceImpl databaseService, ClientServiceImpl clientService) {
        this.serverService = serverService;
        this.databaseService = databaseService;
        this.clientService = clientService;
        this.sendingOperations = sendingOperations;
        this.resourceThreads = new HashMap<>();
        this.serverThreads = new ArrayList<>();
        this.clientThreads = new ArrayList<>();
        this.dbThreads = new ArrayList<>();
    }

    public Map<String, ResourceThread> getResourceThreads() {
        return resourceThreads;
    }

    public void setResourceThreads(Map<String, ResourceThread> resourceThreads) {
        this.resourceThreads = resourceThreads;
    }

    private void startSimulation(){
        for (ResourceThread thread: resourceThreads.values()) {
            thread.start();
        }
    }

    private void stopSimulation(){
        for (ResourceThread thread: resourceThreads.values()) {
            thread.interrupt();
        }
    }

    public void initSimulation(String projectId) {
        this.projectId = projectId;
        List<ServerDTO> serverConnections = serverService.getServersByProjectId(projectId);
        for (ServerDTO serverConnection: serverConnections) {
            ServerThread serverThread = new ServerThread(serverConnection, sendingOperations, this);
            serverThreads.add(serverThread);
            resourceThreads.put(serverConnection.getId(),serverThread);
        }
        List<ClientDTO> clientConnections = clientService.getClientsByProjectId(projectId);
        for (ClientDTO clientConnection: clientConnections) {
            ClientThread clientThread = new ClientThread(clientConnection, sendingOperations, this);
            clientThreads.add(clientThread);
            resourceThreads.put(clientConnection.getId(),clientThread);
        }
        List<DatabaseDTO> databaseConnections = databaseService.getDatabasesByProjectId(projectId);
        for (DatabaseDTO databaseConnection: databaseConnections) {
            DatabaseThread dbThread = new DatabaseThread(databaseConnection, sendingOperations, this);
            dbThreads.add(dbThread);
            resourceThreads.put(databaseConnection.getId(),dbThread);
        }
        isInitialized = true;
    }

    public void stop() {
        if (this.isActive && this.isInitialized) {
            stopSimulation();
            this.isActive = false;
        }
    }

    public void start() {
        if (!this.isActive && this.isInitialized) {
            startSimulation();
            this.isActive = true;
        }
    }

    public void reset() {
        if (this.isInitialized) {
            initSimulation(this.projectId);
            startSimulation();
            this.isActive = true;
        }
    }


}
