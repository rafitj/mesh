package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.*;

import java.util.List;
import java.util.UUID;


public abstract class ResourceEntity {
    @Id
    private String id = UUID.randomUUID().toString().replace("-", "");
    private String label;
    private Boolean isAlive = true;
    private ResourceType type;
    @Relationship(type = "CONNECTS", direction = Relationship.Direction.OUTGOING)
    private List<ConnectsRelationshipEntity> resources;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType type) {
        this.type = type;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<ConnectsRelationshipEntity>  getResources() {
        return resources;
    }

    public void setResources(List<ConnectsRelationshipEntity>  resources) {
        this.resources = resources;
    }

    public Boolean getAlive() {
        return isAlive;
    }

    public void setAlive(Boolean alive) {
        isAlive = alive;
    }
}
