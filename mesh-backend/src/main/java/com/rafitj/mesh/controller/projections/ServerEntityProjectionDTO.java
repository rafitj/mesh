package com.rafitj.mesh.controller.projections;

import com.rafitj.mesh.io.entities.ConnectsRelationshipEntity;
import com.rafitj.mesh.io.entities.ResourceType;

import java.util.List;

public class ServerEntityProjectionDTO extends ResourceProjectionDTO {
    private String instanceType;

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }

    public String getInstanceType() {
        return instanceType;
    }
}