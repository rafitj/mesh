package com.rafitj.mesh.io.dto.shared;

import com.rafitj.mesh.io.entities.ResourceType;

import java.util.List;

public abstract class ResourceDTO {
    private String id;
    private String label;
    private String description;
    private Boolean isAlive;
    private ResourceType type;
    private Double cost;
    private Boolean isOriginResource;
    private List<ConnectionDTO> connections;

    public List<ConnectionDTO> getConnections() {
        return connections;
    }

    public void setConnections(List<ConnectionDTO> connections) {
        this.connections = connections;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Boolean getOriginResource() {
        return isOriginResource;
    }

    public void setOriginResource(Boolean originResource) {
        isOriginResource = originResource;
    }

}
