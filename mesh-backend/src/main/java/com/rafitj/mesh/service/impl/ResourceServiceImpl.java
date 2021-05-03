package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.controller.projections.ClientEntityProjectionDTO;
import com.rafitj.mesh.proto.request.*;
import com.rafitj.mesh.io.dto.shared.ClientDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import com.rafitj.mesh.service.intf.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;
    private final ServerRepo serverRepo;
    private final ProjectRepo projectRepo;

    public ClientServiceImpl(ClientRepo clientRepo, ServerRepo serverRepo, ProjectRepo projectRepo) {
        this.clientRepo = clientRepo;
        this.serverRepo = serverRepo;
        this.projectRepo = projectRepo;
    }

    @Override
    public ClientDTO getClientById(String clientId) {
        ClientEntity clientEntity = clientRepo.findById(clientId).orElse(null);
        ClientDTO clientDTO = new ClientDTO();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(clientEntity, clientDTO);
        return clientDTO;
    }

    @Override
    public List<ClientDTO> getClientsByProjectId(String projectId) {
        List<ClientEntityProjectionDTO> clientEntities = clientRepo.getClientsByProjectId(projectId);
        List<ClientDTO> clientDTOList = new ArrayList<>();
        for (ClientEntityProjectionDTO clientEntity : clientEntities) {
            List<ConnectionDTO> connections = new ArrayList<>();
            if (clientEntity.getRelationshipIds() != null) {
                for (int i = 0; i < clientEntity.getRelationshipIds().size(); ++i) {
                    ConnectionDTO connection = new ConnectionDTO();
                    connection.setFrequency(clientEntity.getFrequencies().get(i));
                    connection.setLatency(clientEntity.getLatencies().get(i));
                    connection.setTarget(clientEntity.getTargets().get(i));
                    connection.setSrc(clientEntity.getId());
                    connection.setRelationId(clientEntity.getRelationshipIds().get(i));
                    connections.add(connection);
                }
            }
            ClientDTO clientDTO = new ClientDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(clientEntity, clientDTO);
            clientDTO.setConnections(connections);
            clientDTOList.add(clientDTO);
        }
        return clientDTOList;
    }

    @Override
    public ClientDTO createClient(CreateClientRequest createClientRequest) {
        String projectId = createClientRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ClientEntity clientEntity = new ClientEntity();
            ClientDTO clientDTO = new ClientDTO();
            modelMapper.map(createClientRequest,clientEntity);
            modelMapper.map(clientEntity,clientDTO);
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(clientEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return clientDTO;
        }
        return null;
    }

    @Override
    public String deleteClient(String id) {
        try {
            clientRepo.deleteById(id);
            return "Success! Server has been deleted.";
        } catch (Exception e) {
            return "Something went wrong... Try again!";
        }
    }

    @Override
    public ClientDTO updateClient(PatchClientRequest patchClientRequest, String id) {
        return null;
    }

    @Override
    public ClientDTO duplicateClient(String id) {
        return null;
    }

    @Override
    public ConnectionDTO connectClient(ConnectResourcesRequest connectResourcesRequest) {
        ClientEntity clientEntity = clientRepo.findById(connectResourcesRequest.getSrc()).orElse(null);
        ServerEntity serverEntity = serverRepo.findById(connectResourcesRequest.getTarget()).orElse(null);
        if (clientEntity != null && serverEntity != null) {
            ConnectsRelationshipEntity relationshipEntityA = new ConnectsRelationshipEntity(
                    connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),clientEntity);
            ConnectsRelationshipEntity relationshipEntityB = new ConnectsRelationshipEntity(
                    connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntity);
            clientEntity.addResourceConnection(relationshipEntityB);
            serverEntity.addResourceConnection(relationshipEntityA);
            clientRepo.save(clientEntity);
            serverRepo.save(serverEntity);
            ConnectionDTO connectionDTO = new ConnectionDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(connectResourcesRequest, connectionDTO);
            return connectionDTO;
        }
        return null;
    }
}
