package com.rafitj.mesh.io.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Users")
public class UserDocument {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private List<String> projects;

    public UserDocument(String name, String email, String password, List<String> projects) {
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
