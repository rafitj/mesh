package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.ResourceType;

import java.util.Collection;

public class ServerEntityProjection extends ResourceEntityProjection {

    private String instanceType;

    public String getInstanceType() {
        return instanceType;
    }

    public void setInstanceType(String instanceType) {
        this.instanceType = instanceType;
    }

}