package com.rafitj.mesh.proto.response;

public class CanViewProjectResponse {
    private boolean canView;
    private String msg;

    public boolean isCanView() {
        return canView;
    }

    public void setCanView(boolean canView) {
        this.canView = canView;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
