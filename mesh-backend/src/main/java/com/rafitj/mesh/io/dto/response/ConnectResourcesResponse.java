package com.rafitj.mesh.io.dto.response;

public class ConnectResourcesResponse {
    private String target;
    private String source;

    public ConnectResourcesResponse(String target, String source) {
        this.target = target;
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
