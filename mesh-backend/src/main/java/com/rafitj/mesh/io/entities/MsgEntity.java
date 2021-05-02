package com.rafitj.mesh.io.entities;

public class MsgEntity {

    enum MESSAGE_TYPE {
        UNKNOWN,
        PING,
        ACTION,
        STATS
    }

    private MESSAGE_TYPE type;
    private String msg;

    public MESSAGE_TYPE getType() {
        return type;
    }

    public void setType(MESSAGE_TYPE type) {
        this.type = type;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

}
