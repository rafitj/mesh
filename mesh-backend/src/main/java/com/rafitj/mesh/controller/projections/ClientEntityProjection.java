package com.rafitj.mesh.controller.projections;

public interface ClientEntityProjection extends ResourceEntityProjection {
    int getThroughput();
    int getClickRate();
}