package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.controller.projections.ServerEntityProjectionDTO;
import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateServerRequest;
import com.rafitj.mesh.proto.request.PatchServerRequest;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.ServerDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import com.rafitj.mesh.service.intf.ServerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServerServiceImpl implements ServerService {

    private final ServerRepo serverRepo;
    private final ProjectRepo projectRepo;

    public ServerServiceImpl(ServerRepo serverRepo, ProjectRepo projectRepo){
        this.serverRepo = serverRepo;
        this.projectRepo = projectRepo;
    }

    @Override
    public ServerDTO getServerById(String serverId) {
        ServerEntity serverEntity = serverRepo.findById(serverId).orElse(null);
        ServerDTO serverDTO = new ServerDTO();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(serverEntity, serverDTO);
        return serverDTO;
    }

    @Override
    public List<ServerDTO> getServersByProjectId(String projectId) {
        List<ServerEntityProjectionDTO> serverEntities = serverRepo.getServersByProjectId(projectId);
        List<ServerDTO> serverDTOList = new ArrayList<>();
        for (ServerEntityProjectionDTO serverEntity : serverEntities) {
            List<ConnectionDTO> connections = new ArrayList<>();
            for (int i = 0; i < serverEntity.getRelationshipIds().size(); ++i) {
                ConnectionDTO connection = new ConnectionDTO();
                connection.setFrequency(serverEntity.getFrequencies().get(i));
                connection.setLatency(serverEntity.getLatencies().get(i));
                connection.setTarget(serverEntity.getTargets().get(i));
                connection.setSrc(serverEntity.getId());
                connections.add(connection);
            }
            ServerDTO serverDTO = new ServerDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(serverEntity, serverDTO);
            serverDTO.setConnections(connections);
            serverDTOList.add(serverDTO);
        }
        return serverDTOList;
    }

    @Override
    public ServerDTO createServer(CreateServerRequest createServerRequest) {
        String projectId = createServerRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ServerEntity serverEntity = new ServerEntity();
            ServerDTO serverDTO = new ServerDTO();
            modelMapper.map(createServerRequest,serverEntity);
            modelMapper.map(serverEntity,serverDTO);
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(serverEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return serverDTO;
        }
        return null;
    }

    @Override
    public String deleteServer(String id) {
        try {
            serverRepo.deleteById(id);
            return "Success! Server has been deleted.";
        } catch (Exception e) {
            return "Something went wrong... Try again!";
        }
    }

    @Override
    public ServerDTO updateServer(PatchServerRequest patchServerRequest, String id) {
        return null;
    }

    @Override
    public ServerDTO duplicateServer(String id) {
        return null;
    }

    @Override
    public ConnectionDTO connectServer(ConnectResourcesRequest connectResourcesRequest) {
        ServerEntity serverEntityA = serverRepo.findById(connectResourcesRequest.getResourceId()).orElse(null);
        ServerEntity serverEntityB = serverRepo.findById(connectResourcesRequest.getServerId()).orElse(null);
        if (serverEntityA != null && serverEntityB != null) {
            ConnectsRelationshipEntity relationshipEntityA = new ConnectsRelationshipEntity(
                    connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntityA);
            ConnectsRelationshipEntity relationshipEntityB = new ConnectsRelationshipEntity(
                    connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntityB);
            serverEntityA.addResourceConnection(relationshipEntityB);
            serverEntityB.addResourceConnection(relationshipEntityA);
            serverRepo.saveAll(List.of(serverEntityA,serverEntityB));
            ConnectionDTO connectionDTO = new ConnectionDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(connectResourcesRequest, connectionDTO);
            return connectionDTO;
        }
        return null;
    }
}
