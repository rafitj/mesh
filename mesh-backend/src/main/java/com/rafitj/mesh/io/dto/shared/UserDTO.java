package com.rafitj.mesh.io.dto.shared;

import java.util.List;

public class UserDTO {
    private String id;
    private String username;
    private List<String> projects;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getProjects() {
        return projects;
    }

    public void setProjects(List<String> projects) {
        this.projects = projects;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
