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

    @Relationship(type = "CONNECTS", direction = Relationship.Direction.OUTGOING)
    private List<ConnectsRelationshipEntity> resourceConnections;

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

    public List<ConnectsRelationshipEntity> getResourceConnections() {
        return resourceConnections;
    }

    public void setResourceConnections(List<ConnectsRelationshipEntity> resourceConnections) {
        this.resourceConnections = resourceConnections;
    }

    public void addResourceConnection(ConnectsRelationshipEntity resourceConnection) {
        if (this.resourceConnections == null) {
            this.resourceConnections = new ArrayList<>();
        }
        this.resourceConnections.add(resourceConnection);
    }

    public Boolean getAlive() {
        return isAlive;
    }

    public void setAlive(Boolean alive) {
        isAlive = alive;
    }
}
