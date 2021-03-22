package com.rafitj.mesh.io.entities;

import org.springframework.data.neo4j.core.schema.Node;

@Node("Client")
public class ClientEntity extends ResourceEntity {
    private int throughput;
    private int clickRate;

    public ClientEntity(String label, int throughput, int clickRate) {
        this.throughput = throughput;
        this.clickRate = clickRate;
        this.setType(ResourceType.CLIENT);
        this.setLabel(label);
    }

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
