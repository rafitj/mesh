package com.rafitj.mesh.io.dto.response;

import com.rafitj.mesh.io.dto.shared.ResourceDTO;

public class CreateServerResponse extends ResourceDTO {
    private String instanceType;

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }
}
