package com.rafitj.mesh.proto.request;

public class CreateDatabaseRequest extends CreateResourceRequest{
    private String dbType;

    public String getDbType() {
        return dbType;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }
}
