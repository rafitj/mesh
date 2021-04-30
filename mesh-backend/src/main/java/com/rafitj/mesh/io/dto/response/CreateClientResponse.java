package com.rafitj.mesh.io.dto.response;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;

public class CreateClientResponse extends ResourceDTO {
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
