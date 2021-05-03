package com.rafitj.mesh.io.dto.shared;

import com.rafitj.mesh.io.entities.ResourceType;

public class ServerDTO extends ResourceDTO {
    private String instanceType;

    public ServerDTO() {
        setType(ResourceType.SERVER);
    }

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }
}
