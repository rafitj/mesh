package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class ConnectsRelationshipEntity {
    @Id @GeneratedValue
    private long relationshipId;
    @Property
    private int latency;
    @Property
    private int frequency;
    @TargetNode
    private ResourceEntity targetResource;

    public ConnectsRelationshipEntity(int latency, int frequency, ResourceEntity targetResource) {
        this.latency = latency;
        this.frequency = frequency;
        this.targetResource = targetResource;
    }

    public long getRelationshipId() {
        return relationshipId;
    }

    public void setRelationshipId(long relationshipId) {
        this.relationshipId = relationshipId;
    }

    public int getLatency() {
        return latency;
    }

    public void setLatency(int latency) {
        this.latency = latency;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public ResourceEntity getTargetResource() {
        return targetResource;
    }

    public void setTargetResource(ResourceEntity targetResource) {
        this.targetResource = targetResource;
    }
}