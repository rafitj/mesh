package com.rafitj.mesh.controller.projections;

import com.rafitj.mesh.io.entities.ResourceType;

import java.util.List;

public interface ServerEntityProjection {
    String getInstanceType();
    String getId();
    String getLabel();
    Boolean getIsAlive();
    Boolean getIsOriginResource();
    ResourceType getType();
    String getTargets();
    List<Integer> getLatencies();
    List<Integer> getFrequencies();
    List<Long> getRelationIds();
}