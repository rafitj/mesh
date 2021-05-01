package com.rafitj.mesh.controller.projections;

import com.rafitj.mesh.io.entities.ConnectsRelationshipEntity;
import com.rafitj.mesh.io.entities.ResourceType;

import java.util.List;

public class ClientEntityProjectionDTO extends ResourceProjectionDTO {
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

    public void setClickRate(int clickrate) {
        this.clickRate = clickrate;
    }
}