package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.Node;

import java.util.List;

@Node
public class DatabaseEntity extends ResourceEntity{
    private String dbType;
    private List<String> dbResources;

    public DatabaseEntity(String dbType, List<String> resources) {
        this.dbType = dbType;
        this.dbResources = resources;
    }

    public String getDbType() {
        return dbType;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }

    public List<String> getDbResources() {
        return dbResources;
    }

    public void setDbResources(List<String> dbResources) {
        this.dbResources = dbResources;
    }
}
