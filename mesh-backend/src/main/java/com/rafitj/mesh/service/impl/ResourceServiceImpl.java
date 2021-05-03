package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.controller.projections.ResourceProjectionDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateResourceRequest;
import com.rafitj.mesh.service.intf.ResourceService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// TODO: Refactor other services around this service
@Service
public class ResourceServiceImpl implements ResourceService {

    private final ProjectRepo projectRepo;

    public ResourceServiceImpl(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    @Override
    public void createResourceConnections(List<ResourceProjectionDTO> resourceEntities,
                                               List<ResourceDTO> resourceDTOList, ResourceDTO resourceDTO) {
        for (ResourceProjectionDTO resourceEntity : resourceEntities) {
            List<ConnectionDTO> connections = new ArrayList<>();
            if (resourceEntity.getRelationshipIds() != null) {
                for (int i = 0; i < resourceEntity.getRelationshipIds().size(); ++i) {
                    ConnectionDTO connection = new ConnectionDTO();
                    connection.setFrequency(resourceEntity.getFrequencies().get(i));
                    connection.setLatency(resourceEntity.getLatencies().get(i));
                    connection.setTarget(resourceEntity.getTargets().get(i));
                    connection.setSrc(resourceEntity.getId());
                    connection.setRelationId(resourceEntity.getRelationshipIds().get(i));
                    connections.add(connection);
                }
            }
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(resourceEntity, resourceDTO);
            resourceDTO.setConnections(connections);
            resourceDTOList.add(resourceDTO);
        }
    }


    @Override
    public ResourceDTO createResource(CreateResourceRequest createResourceRequest, ResourceDTO resourceDTO) {
        String projectId = createResourceRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ClientEntity clientEntity = new ClientEntity();
            modelMapper.map(createResourceRequest,clientEntity);
            modelMapper.map(clientEntity,resourceDTO);
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(clientEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return resourceDTO;
        }
        return null;
    }

    @Override
    public ConnectionDTO connectResources(ConnectResourcesRequest connectResourcesRequest,
                                          ResourceEntity resourceEntity, ServerEntity serverEntity) {
        ConnectsRelationshipEntity relationshipEntityA = new ConnectsRelationshipEntity(
                connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),resourceEntity);
        ConnectsRelationshipEntity relationshipEntityB = new ConnectsRelationshipEntity(
                connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntity);
        resourceEntity.addResourceConnection(relationshipEntityB);
        serverEntity.addResourceConnection(relationshipEntityA);
        ConnectionDTO connectionDTO = new ConnectionDTO();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(connectResourcesRequest, connectionDTO);
        return connectionDTO;
    }
}
