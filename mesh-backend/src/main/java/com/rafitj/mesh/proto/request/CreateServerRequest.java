package com.rafitj.mesh.proto.request;

public class CreateServerRequest extends CreateResourceRequest {
    private String instanceType;

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }
}
