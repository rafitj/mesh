package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.Node;

@Node
public class ServerEntity extends ResourceEntity{
    private String instanceType;

    public ServerEntity(String instanceType) {
        this.instanceType = instanceType;
    }

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }
}
