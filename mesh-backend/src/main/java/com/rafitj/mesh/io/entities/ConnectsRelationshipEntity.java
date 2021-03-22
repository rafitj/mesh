package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.*;

import java.util.List;

@RelationshipProperties
public class ConnectsRelationshipEntity {
    @Id @GeneratedValue
    private Long relationshipId;
    @Property
    private int latency;
    @TargetNode
    private ResourceEntity targetResource;
    public ConnectsRelationshipEntity(int latency, ResourceEntity targetResource) {
        this.latency = latency;
        this.targetResource = targetResource;
    }

    public Long getRelationshipId() {
        return relationshipId;
    }

    public void setRelationshipId(Long relationshipId) {
        this.relationshipId = relationshipId;
    }

    public int getLatency() {
        return latency;
    }

    public void setLatency(int latency) {
        this.latency = latency;
    }

    public ResourceEntity getTargetResource() {
        return targetResource;
    }

    public void setTargetResource(ResourceEntity targetResource) {
        this.targetResource = targetResource;
    }
}