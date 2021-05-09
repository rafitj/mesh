package com.rafitj.mesh.io.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Users")
public class UserDocument {
    @Id
    private String id;
    private String username;
    private String password;
    private List<String> projects;

    public UserDocument(String username, String password, List<String> projects) {
        this.password = password;
        this.username = username;
        this.projects = projects;
    }

    public UserDocument() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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
}
