package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public abstract class ResourceEntity {
    @Id
    private String id = UUID.randomUUID().toString().replace("-", "");
    private String label;
    private String description;
    private Boolean isAlive = true;
    private ResourceType type;
    private Double cost;
    private Boolean isOriginResource = false;

    @Relationship(type = "CONNECTS", direction = Relationship.Direction.OUTGOING)
    private List<ConnectsRelationshipEntity> connections;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<ConnectsRelationshipEntity> getConnections() {
        return connections;
    }

    public void setConnections(List<ConnectsRelationshipEntity> connections) {
        this.connections = connections;
    }

    public void addResourceConnection(ConnectsRelationshipEntity connection) {
        if (this.connections == null) {
            this.connections = new ArrayList<>();
        }
        this.connections.add(connection);
    }

    public Boolean isAlive() {
        return isAlive;
    }

    public void setAlive(Boolean alive) {
        isAlive = alive;
    }

    public Boolean isOriginResource() {
        return isOriginResource;
    }

    public void setOriginResource(Boolean originResource) {
        isOriginResource = originResource;
    }

    public ResourceEntity(ResourceEntity resourceEntity) {
        setCost(resourceEntity.getCost());
        setType(resourceEntity.getType());
        setDescription(resourceEntity.getDescription());
        setLabel(resourceEntity.getLabel());
        setAlive(resourceEntity.isAlive());
        setOriginResource(resourceEntity.isOriginResource());
    }

    public ResourceEntity() {
    }
}
