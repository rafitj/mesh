package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.controller.projections.ResourceProjectionDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;
import com.rafitj.mesh.io.entities.ResourceEntity;
import com.rafitj.mesh.io.entities.ServerEntity;
import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateResourceRequest;

import java.util.List;

public interface ResourceService {
    void createResourceConnections(List<ResourceProjectionDTO> resourceEntities,
                                   List<ResourceDTO> resourceDTOList, ResourceDTO resourceDTO);
    ConnectionDTO connectResources(ConnectResourcesRequest connectResourcesRequest,
                                   ResourceEntity resourceEntity, ServerEntity serverEntity);
    ResourceDTO createResource(CreateResourceRequest createResourceRequest, ResourceDTO resourceDTO);
}
