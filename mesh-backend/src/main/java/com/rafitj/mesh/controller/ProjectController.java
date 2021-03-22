package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/project")
@CrossOrigin("http://localhost:3000")
public class ProjectController {
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    ServerRepo serverRepo;
    @Autowired
    DatabaseRepo dbRepo;
    @Autowired
    ClientRepo clientRepo;

    @GetMapping("/all")
    private Collection<ProjectEntity> getProjects() {
        return projectRepo.findAll();
    }

    @GetMapping("/{id}/info")
    private Optional<ProjectEntity> getProjectById(@PathVariable String id) {
        return projectRepo.findById(id);
    }

    @GetMapping("/{id}/resources")
    private Collection<ResourceEntityProjection> getProjectResourcesById(@PathVariable String id) {
        Collection<ResourceEntityProjection> projectResources = new ArrayList<>();
        projectResources.addAll(serverRepo.getServersByProjectId(id));
        projectResources.addAll(clientRepo.getClientsByProjectId(id));
        projectResources.addAll(dbRepo.getDatabasesByProjectId(id));
        return projectResources;
    }
}
