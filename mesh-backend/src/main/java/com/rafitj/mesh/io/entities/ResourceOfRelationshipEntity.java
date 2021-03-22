package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.*;

import java.util.List;

@RelationshipProperties
public class ResourceOfRelationshipEntity {
    @Id @GeneratedValue
    private Long relationshipId;
    @TargetNode
    private ResourceEntity resource;
    public ResourceOfRelationshipEntity(ResourceEntity resource) {
        this.resource = resource;
    }

    public Long getRelationshipId() {
        return relationshipId;
    }

    public void setRelationshipId(Long relationshipId) {
        this.relationshipId = relationshipId;
    }

    public ResourceEntity getResource() {
        return resource;
    }

    public void setResource(ResourceEntity resource) {
        this.resource = resource;
    }
}