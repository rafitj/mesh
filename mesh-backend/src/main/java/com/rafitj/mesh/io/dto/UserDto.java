package com.rafitj.mesh.io.dto;

import java.util.List;

public class UserDto {
    private String id;
    private String name;
    private String email;
    private String password;
    private List<String> projects;

    public UserDto(String id, String name, String email, String password, List<String> projects) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.projects = projects;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getProjects() {
        return projects;
    }

    public void setProjects(List<String> projects) {
        this.projects = projects;
    }
}
