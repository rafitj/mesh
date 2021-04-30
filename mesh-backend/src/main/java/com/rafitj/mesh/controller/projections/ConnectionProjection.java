package com.rafitj.mesh.controller.projections;

public interface ConnectionProjection {
    String getSrc();
    String getTarget();
    int getLatency();
    int getFrequency();
    long getRelationId();
    void setSrc(String src);
    void setTarget(String target);
    void setLatency(int latency);
    void setRelationId(long relationId);
    void setFrequency(int frequency);
}
