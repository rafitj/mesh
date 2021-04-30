package com.rafitj.mesh.io.dto.response;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjection;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;

import java.util.List;

public class CreateDatabaseResponse extends ResourceDTO {
    private String dbType;
    private List<String> dbResources;

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
