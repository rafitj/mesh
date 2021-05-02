package com.rafitj.mesh.controller.projections;

import com.rafitj.mesh.io.entities.ConnectsRelationshipEntity;
import com.rafitj.mesh.io.entities.ResourceType;

import java.util.List;

public class ResourceProjectionDTO {
    private String id;
    private String label;
    private String description;
    private Boolean isAlive;
    private ResourceType type;
    private Double cost;
    private Boolean isOriginResource;
    private List<String> targets;
    private List<Integer> latencies;
    private List<Integer> frequencies;
    private List<Long> relationshipIds;
//    private List<ConnectsRelationshipEntity> connections;

//    public List<ConnectsRelationshipEntity> getConnections() {
//        return connections;
//    }

//    public void setConnections(List<ConnectsRelationshipEntity> connections) {
//        this.connections = connections;
//    }

    public List<String> getTargets() {
        return targets;
    }

    public void setTargets(List<String> targets) {
        this.targets = targets;
    }

    public List<Integer> getLatencies() {
        return latencies;
    }

    public void setLatencies(List<Integer> latencies) {
        this.latencies = latencies;
    }

    public List<Integer> getFrequencies() {
        return frequencies;
    }

    public void setFrequencies(List<Integer> frequencies) {
        this.frequencies = frequencies;
    }

    public List<Long> getRelationshipIds() {
        return relationshipIds;
    }

    public void setRelationshipIds(List<Long> relationshipIds) {
        this.relationshipIds = relationshipIds;
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