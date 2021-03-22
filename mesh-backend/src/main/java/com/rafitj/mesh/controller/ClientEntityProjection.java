package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.ResourceType;

import java.util.Collection;

public class ClientEntityProjection extends ResourceEntityProjection {
    private int throughput;
    private int clickRate;

    public int getThroughput() {
        return throughput;
    }

    public void setThroughput(int throughput) {
        this.throughput = throughput;
    }

    public int getClickRate() {
        return clickRate;
    }

    public void setClickRate(int clickRate) {
        this.clickRate = clickRate;
    }
}