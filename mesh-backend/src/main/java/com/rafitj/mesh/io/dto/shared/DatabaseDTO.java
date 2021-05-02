package com.rafitj.mesh.io.dto.shared;

import java.util.List;

public class DatabaseDTO extends ResourceDTO {
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
