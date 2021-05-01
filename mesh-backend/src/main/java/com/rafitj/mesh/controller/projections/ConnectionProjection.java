package com.rafitj.mesh.controller.projections;

public interface ConnectionProjection {
    String getSrc();
    String getTarget();
    int getLatency();
    int getFrequency();
    long getRelationId();
}
