package com.rafitj.mesh.io.dto.shared;

import com.rafitj.mesh.controller.projections.ConnectionProjection;

public class ConnectionDTO implements ConnectionProjection {
    private String src;
    private String target;
    private int latency;
    private int frequency;
    private long relationId;

    @Override
    public String getSrc() {
        return src;
    }

    @Override
    public void setSrc(String src) {
        this.src = src;
    }

    @Override
    public String getTarget() {
        return target;
    }

    @Override
    public void setTarget(String target) {
        this.target = target;
    }

    @Override
    public int getLatency() {
        return latency;
    }

    @Override
    public void setLatency(int latency) {
        this.latency = latency;
    }

    @Override
    public int getFrequency() {
        return frequency;
    }

    @Override
    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    @Override
    public long getRelationId() {
        return relationId;
    }

    @Override
    public void setRelationId(long relationId) {
        this.relationId = relationId;
    }
}
