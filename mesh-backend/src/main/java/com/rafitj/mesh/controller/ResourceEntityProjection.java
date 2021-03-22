package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.ResourceType;

import java.util.Collection;

public class ResourceEntityProjection {
    private String id;
    private String label;
    private Boolean isAlive;
    private ResourceType type;
    private Collection<String> connections;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Boolean getAlive() {
        return isAlive;
    }

    public void setAlive(Boolean alive) {
        isAlive = alive;
    }

    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType type) {
        this.type = type;
    }

    public Collection<String> getConnections() {
        return connections;
    }

    public void setConnections(Collection<String> connections) {
        this.connections = connections;
    }
}
