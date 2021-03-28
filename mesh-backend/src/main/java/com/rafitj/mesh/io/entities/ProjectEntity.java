package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Node("Project")
public class ProjectEntity {
    @Id
    private String id = UUID.randomUUID().toString().replace("-", "");;
    private String name;
    private int budget;
    private boolean isPublic = false;
    @Relationship(type = "RESOURCE_OF", direction = Relationship.Direction.INCOMING)
    private List<ResourceOfRelationshipEntity> resources;

    public ProjectEntity(String name, int budget, List<ResourceOfRelationshipEntity> resources) {
        this.name = name;
        this.budget = budget;
        this.resources = resources;
    }

    public ProjectEntity() {
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public List<ResourceOfRelationshipEntity> getResources() {
        return resources;
    }

    public void setResources(List<ResourceOfRelationshipEntity> resources) {
        this.resources = resources;
    }

    public void addResource(ResourceOfRelationshipEntity resource) {
        if (this.resources == null) {
            this.resources = new ArrayList<>();
        }
        this.resources.add(resource);
    }
}
