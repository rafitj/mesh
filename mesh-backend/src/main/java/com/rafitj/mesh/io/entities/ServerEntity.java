package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.Node;

@Node("Server")
public class ServerEntity extends ResourceEntity {
    private String instanceType;

    public ServerEntity(String label, String instanceType) {
        this.instanceType = instanceType;
        this.setLabel(label);
        this.setType(ResourceType.SERVER);
    }

    public ServerEntity(ServerEntity serverEntity) {
        super(serverEntity);
        this.setInstanceType(serverEntity.getInstanceType());
    }

    public ServerEntity() {
        this.setType(ResourceType.SERVER);
    }

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }
}
