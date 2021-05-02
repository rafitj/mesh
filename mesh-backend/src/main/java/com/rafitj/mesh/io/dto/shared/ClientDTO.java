package com.rafitj.mesh.io.dto.shared;

public class ClientDTO extends ResourceDTO {
    private int latency;
    private int frequency;

    public ClientDTO(){
        setOriginResource(true);
    }

    public int getLatency() {
        return latency;
    }

    public void setLatency(int latency) {
        this.latency = latency;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }
}
