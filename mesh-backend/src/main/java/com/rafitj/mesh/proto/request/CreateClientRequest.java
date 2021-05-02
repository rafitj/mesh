package com.rafitj.mesh.proto.request;

public class CreateClientRequest extends CreateResourceRequest {
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
