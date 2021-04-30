package com.rafitj.mesh.controller.projections;

import com.rafitj.mesh.io.entities.ResourceType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

public interface ServerEntityProjection {
    String getInstanceType();
    String getId();
    String getLabel();
    Boolean getIsAlive();
    Boolean getIsOriginResource();
    ResourceType getType();
    List<ConnectionProjection> getConnections();
}