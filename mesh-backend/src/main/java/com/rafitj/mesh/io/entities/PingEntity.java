package com.rafitj.mesh.io.entities;

import com.rafitj.mesh.io.dto.shared.ConnectionDTO;

public class PingEntity extends MsgEntity {
    private int latency;

    private String src;

    private String target;

    private long id;

    public PingEntity() {
        setType(MESSAGE_TYPE.PING);
    }

    public PingEntity(ConnectionDTO connection) {
        setType(MESSAGE_TYPE.PING);
        setLatency(connection.getLatency());
        setSrc(connection.getSrc());
        setTarget(connection.getTarget());
        setId(connection.getRelationId());
    }

    public int getLatency() {
        return latency;
    }

    public void setLatency(int latency) {
        this.latency = latency;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
