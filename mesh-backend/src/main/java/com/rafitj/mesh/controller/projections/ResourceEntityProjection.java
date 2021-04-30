package com.rafitj.mesh.controller.projections;

import com.rafitj.mesh.io.entities.ResourceType;

import java.util.List;

public interface ResourceEntityProjection {

    String getId();
    String getLabel();
    Boolean getIsAlive();
    Boolean getIsOriginResource();
    ResourceType getType();
    List<ConnectionProjection> getConnections();

}

