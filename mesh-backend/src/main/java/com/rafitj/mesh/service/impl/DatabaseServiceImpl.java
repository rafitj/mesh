package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjectionDTO;
import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateDatabaseRequest;
import com.rafitj.mesh.proto.request.PatchDatabaseRequest;
import com.rafitj.mesh.io.dto.shared.DatabaseDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import com.rafitj.mesh.service.intf.DatabaseService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DatabaseServiceImpl implements DatabaseService {
    private final DatabaseRepo databaseRepo;
    private final ServerRepo serverRepo;
    private final ProjectRepo projectRepo;

    public DatabaseServiceImpl(DatabaseRepo databaseRepo, ServerRepo serverRepo, ProjectRepo projectRepo) {
        this.databaseRepo = databaseRepo;
        this.serverRepo = serverRepo;
        this.projectRepo = projectRepo;
    }

    @Override
    public DatabaseDTO getDatabaseById(String databaseId) {
        DatabaseEntity serverEntity = databaseRepo.findById(databaseId).orElse(null);
        DatabaseDTO databaseDTO = new DatabaseDTO();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(serverEntity, databaseDTO);
        return databaseDTO;
    }

    @Override
    public List<DatabaseDTO> getDatabasesByProjectId(String projectId) {
        List<DatabaseEntityProjectionDTO> databaseEntities = databaseRepo.getDatabasesByProjectId(projectId);
        List<DatabaseDTO> databaseDTOList = new ArrayList<>();
        for (DatabaseEntityProjectionDTO databaseEntity : databaseEntities) {
            List<ConnectionDTO> connections = new ArrayList<>();
            if (databaseEntity.getRelationshipIds() != null) {
                for (int i = 0; i < databaseEntity.getRelationshipIds().size(); ++i) {
                    ConnectionDTO connection = new ConnectionDTO();
                    connection.setFrequency(databaseEntity.getFrequencies().get(i));
                    connection.setLatency(databaseEntity.getLatencies().get(i));
                    connection.setTarget(databaseEntity.getTargets().get(i));
                    connection.setSrc(databaseEntity.getId());
                    connection.setRelationId(databaseEntity.getRelationshipIds().get(i));
                    connections.add(connection);
                }
            }
            DatabaseDTO databaseDTO = new DatabaseDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(databaseEntity, databaseDTO);
            databaseDTO.setConnections(connections);
            databaseDTOList.add(databaseDTO);
        }
        return databaseDTOList;
    }

    @Override
    public DatabaseDTO createDatabase(CreateDatabaseRequest createDatabaseRequest) {
        String projectId = createDatabaseRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            DatabaseEntity databaseEntity = new DatabaseEntity();
            DatabaseDTO databaseDTO = new DatabaseDTO();
            modelMapper.map(createDatabaseRequest,databaseEntity);
            modelMapper.map(databaseEntity,databaseDTO);
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(databaseEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return databaseDTO;
        }
        return null;
    }

    @Override
    public String deleteDatabase(String id) {
        try {
            databaseRepo.deleteById(id);
            return "Success! Server has been deleted.";
        } catch (Exception e) {
            return "Something went wrong... Try again!";
        }
    }

    @Override
    public DatabaseDTO updateDatabase(PatchDatabaseRequest patchDatabaseRequest, String id) {
        return null;
    }

    @Override
    public DatabaseDTO duplicateDatabase(String id) {
        return null;
    }

    @Override
    public ConnectionDTO connectDatabase(ConnectResourcesRequest connectResourcesRequest) {
        DatabaseEntity databaseEntity = databaseRepo.findById(connectResourcesRequest.getSrc()).orElse(null);
        ServerEntity serverEntity = serverRepo.findById(connectResourcesRequest.getTarget()).orElse(null);
        if (databaseEntity != null && serverEntity != null) {
            ConnectsRelationshipEntity relationshipEntityA = new ConnectsRelationshipEntity(
                    connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),databaseEntity);
            ConnectsRelationshipEntity relationshipEntityB = new ConnectsRelationshipEntity(
                    connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntity);
            databaseEntity.addResourceConnection(relationshipEntityB);
            serverEntity.addResourceConnection(relationshipEntityA);
            databaseRepo.save(databaseEntity);
            serverRepo.save(serverEntity);
            ConnectionDTO connectionDTO = new ConnectionDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(connectResourcesRequest, connectionDTO);
            return connectionDTO;
        }
        return null;
    }
}
