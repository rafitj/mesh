package com.rafitj.mesh.io.dto;

public class ConnectResourcesResponseDTO {
    private String target;
    private String source;

    public ConnectResourcesResponseDTO(String target, String source) {
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
