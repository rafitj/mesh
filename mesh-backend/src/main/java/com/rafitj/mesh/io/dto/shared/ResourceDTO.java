package com.rafitj.mesh.io.dto.shared;

import com.rafitj.mesh.controller.projections.ConnectionProjection;
import com.rafitj.mesh.controller.projections.ResourceEntityProjection;
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
    private List<ConnectionDTO> connectionProjections;

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

    public Boolean getIsAlive() {
        return isAlive;
    }

    public void setIsAlive(Boolean alive) {
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

    public Boolean getIsOriginResource() {
        return isOriginResource;
    }

    public void setIsOriginResource(Boolean originResource) {
        isOriginResource = originResource;
    }

    public List<ConnectionDTO> getConnections() {
        return connectionProjections;
    }

    public void setConnections(List<ConnectionDTO> connectionProjections) {
        this.connectionProjections = connectionProjections;
    }
}
