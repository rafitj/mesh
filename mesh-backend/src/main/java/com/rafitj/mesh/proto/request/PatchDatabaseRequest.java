package com.rafitj.mesh.proto.request;

public class PatchDatabaseRequest extends PatchResourceRequest {
    private String dbType;

    public String getDbType() {
        return dbType;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }
}
